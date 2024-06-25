// repositories/UserProfileRepository.js
import mongoose from 'mongoose';
import UserProfileRepositoryInterface from '../interfaces/UserProfileRepositoryInterface.js';
import Post from '../models/post/post.model.js';
import PostSchema from '../models/post/postSchema.model..js';
import UserProfile from '../models/user/userProfile.model.js';

export default class UserProfileRepository extends UserProfileRepositoryInterface {
  async findByUserID(userID) {
    return UserProfile.findOne({ userID })
      .populate('semesterNumber', 'semesterNumber')
      .populate('division', 'divisionName')
      .populate('branches', 'branchName');
  }

  async getUserData(userID) {
    return await UserProfile.findOne({ userID }, '_id username userProfileImage');
  }

  async findById(_id) {
    return await UserProfile.findById(_id);
  }

  async findByEmail(email) {
    return UserProfile.findOne({ email });
  }

  async save(userProfile) {
    return userProfile.save();
  }

  async findByUsername(username) {
    return await UserProfile.findOne({
      username: username,
    });
  }

  async findByUsernameFilter(username) {
    return await UserProfile.find({
      username: { $regex: `^${username}` },
    }).select('name username userProfileImage');
  }

  async findUserByDivisionId(divisionId) {
    await UserProfile.find({ division: divisionId });
  }

  async getUserPosts(startIndex, itemsPerPage, userId) {
    const posts = await PostSchema.find({ postedBy: userId })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(itemsPerPage)
      .select('attachments likes comments');
    return posts;
  }

  async savePost(postId, userProfileId, post) {
    const user = await UserProfile.findById(userProfileId);
    post.saved.push(userProfileId);
    user.savedPosts.push(postId);
    const data = await Promise.all([post.save(), user.save()]);
    console.log(data);
    return data;
  }

  async unSavePost(postId, userProfileId, post) {
    const user = await UserProfile.findById(userProfileId);
    if (user.savedPosts.includes(postId)) {
      user.savedPosts.remove(postId);
      post.saved.remove(userProfileId);
    }
    const data = await Promise.all([post.save(), user.save()]);
    return data;
  }

  async getSavePostData(userProfileId) {
    return await UserProfile.findById(userProfileId).select('savedPosts');
  }

  async getAllSavedPost(userProfileId) {
    const posts = await PostSchema.find({ saved: userProfileId });
    return posts;
  }

  async followUser(userId, userToFollowId) {
    const user = await UserProfile.findById(userId);
    user.following.push(userToFollowId);
    const currentUser = await user.save();

    const userToFollow = await UserProfile.findById(userToFollowId);
    userToFollow.followers.push(userId);
    const followingUser = await userToFollow.save();

    return {
      currentUser,
      followingUser,
    };
  }

  async unfollowUser(userId, userToFollowId) {
    const user = await UserProfile.findById(userId);
    user.following.remove(userToFollowId);
    const currentUser = await user.save();

    const userToFollow = await UserProfile.findById(userToFollowId);
    userToFollow.followers.remove(userId);
    const followingUser = await userToFollow.save();

    return {
      currentUser,
      followingUser,
    };
  }

  async checkUserFollowStatus(userId, userToFollowId) {
    const checkCurrentUserFollowingId = await UserProfile.findOne({
      _id: userId,
      following: userToFollowId,
    });

    const checkFollowingUsersCurrentUserId = await UserProfile.findOne({
      _id: userToFollowId,
      followers: userId,
    });

    if (checkFollowingUsersCurrentUserId && checkCurrentUserFollowingId) {
      return true;
    }

    return false;
  }

  async checkUserUnFollowStatus(userId, userToUnfollowId) {
    const checkCurrentUserUnFollowingId = await UserProfile.findOne({
      _id: userId,
      following: userToUnfollowId,
    });

    const checkUnFollowingUsersCurrentUserId = await UserProfile.findOne({
      _id: userToUnfollowId,
      followers: userId,
    });

    if (checkCurrentUserUnFollowingId && checkUnFollowingUsersCurrentUserId) {
      return true;
    }

    return false;
  }

  async checkIfUserIsAlreadyFollowing(userId, userToFollowId) {
    const isAlreadyFollowing = await UserProfile.findOne({
      _id: userId,
      following: userToFollowId,
    });
    if (isAlreadyFollowing) {
      return {
        isFollowing: true,
      };
    }
    return {
      isFollowing: false,
    };
  }

  async editProfile(
    userProfileId,
    username,
    name,
    userProfileImage,
    bio,
    privateAccount,
    gender
  ) {
    const user = await UserProfile.findByIdAndUpdate(
      userProfileId,
      {
        username,
        userProfileImage,
        name,
        about: bio,
        isPrivate: privateAccount.toLowerCase() === 'True',
        gender: gender ? gender : '',
      },
      { new: true }
    );
    return await user.save();
  }

  async getFollowers(startIndex, itemsPerPage, userProfileId) {
    try {
      return await UserProfile.findById(userProfileId).populate({
        path: 'followers',
        select: 'userProfileImage username',
        options: {
          skip: startIndex,
          limit: itemsPerPage,
        },
      });
    } catch (error) {
      console.log(`Error in ${error.message}`);
      throw new Error(error.message);
    }
  }

  async getSuggestedUser(userProfileId) {
    const user = await UserProfile.findById(userProfileId).select('suggestedUser');
    return user.suggestedUser;
  }

  async getFollowings(startIndex, itemsPerPage, userProfileId) {
    const userData = await UserProfile.findById(userProfileId)
      .select('following')
      .populate({
        path: 'following',
        select: 'userProfileImage username',
        options: {
          skip: startIndex,
          limit: itemsPerPage,
        },
      });

    return userData.following;
  }

  async getFollowingDataByAggregate(
    startIndex,
    itemsPerPage,
    currentUserProfileId,
    userProfileId
  ) {
    const followings = await UserProfile.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(currentUserProfileId) } },
      { $project: { following: 1 } },
      { $unwind: '$following' },
      { $skip: startIndex },
      { $limit: itemsPerPage },
      {
        $lookup: {
          from: 'userprofiles',
          localField: 'following',
          foreignField: '_id',
          as: 'followingDetails',
        },
      },
      { $unwind: '$followingDetails' },
      {
        $lookup: {
          from: 'userprofiles',
          let: { followingId: '$following' },
          pipeline: [
            { $match: { _id: new mongoose.Types.ObjectId(userProfileId) } },
            { $project: { following: 1 } },
            {
              $match: {
                $expr: { $in: ['$$followingId', '$following'] },
              },
            },
          ],
          as: 'isFollowedByUser',
        },
      },
      {
        $project: {
          'followingDetails._id': 1,
          'followingDetails.userProfileImage': 1,
          'followingDetails.username': 1,
          isFollowedByUser: { $gt: [{ $size: '$isFollowedByUser' }, 0] },
          _id: 0,
        },
      },
    ]);

    return followings;
  }

  async getFollowersByAggregate(startIndex, itemsPerPage, userProfileId) {
    const followers = await UserProfile.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userProfileId) } },
      { $project: { followers: 1, following: 1 } }, //
      { $unwind: '$followers' },
      { $skip: startIndex },
      { $limit: itemsPerPage },
      {
        $lookup: {
          from: 'userprofiles',
          localField: 'followers',
          foreignField: '_id',
          as: 'followerDetails',
        },
      },
      { $unwind: '$followerDetails' },
      {
        $addFields: {
          isFollowedByUser: { $in: ['$followerDetails._id', '$following'] },
        },
      },
      {
        $project: {
          'followerDetails._id': 1,
          'followerDetails.userProfileImage': 1,
          'followerDetails.username': 1,
          isFollowedByUser: 1,
        },
      },
    ]);

    return followers;
  }

  async getUserProfileData(userId) {
    const userProfile = UserProfile.findById(userId).select(
      'userID name username about userProfileImage'
    );

    if (!userProfile) {
      throw new Error("User doesn't exist");
    }

    const aggregationPipeLine = [
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $project: {
          followersCount: { $size: '$followers' },
          postCount: { $size: '$posts' },
          followingCount: { $size: '$following' },
        },
      },
    ];

    const [profileData, userStatus] = await Promise.all([
      userProfile,
      UserProfile.aggregate(aggregationPipeLine),
    ]);

    const userData = { data: { profileData, userStatus: userStatus[0] } };
    return userData;
  }

  async getUserProfileFollowers(userId) {
    const aggregationPipeLine = [
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $project: { followersCount: { $size: '$followers' } },
      },
    ];

    const result = await UserProfile.aggregate(aggregationPipeLine);
    return result;
  }
}
