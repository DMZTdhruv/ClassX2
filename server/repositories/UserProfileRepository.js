// repositories/UserProfileRepository.js
import UserProfileRepositoryInterface from '../interfaces/UserProfileRepositoryInterface.js'
import UserProfile from '../models/user/userProfile.model.js'

export default class UserProfileRepository extends UserProfileRepositoryInterface {
  async findByUserID(userID) {
    return UserProfile.findOne({ userID })
      .populate('semesterNumber', 'semesterNumber')
      .populate('division', 'divisionName')
      .populate('branches', 'branchName')
  }

  async getUserData(userID) {
    return await UserProfile.findOne({ userID }, '_id username')
  }

  async findById(_id) {
    return await UserProfile.findById(_id)
  }

  async findByEmail(email) {
    return UserProfile.findOne({ email })
  }

  async save(userProfile) {
    return userProfile.save()
  }

  async findByUsername(username) {
    return await UserProfile.findOne({
      username: username,
    })
  }

  async findByUsernameFilter(username) {
    return await UserProfile.find({
      username: { $regex: `^${username}` },
    }).select('name username userProfileImage')
  }

  async findUserByDivisionId(divisionId) {
    await UserProfile.find({ division: divisionId })
  }

  async getUserPosts(userId) {
    const posts = await UserProfile.find({ _id: userId })
      .select('posts')
      .populate('posts')
    return posts
  }

  async followUser(userId, userToFollowId) {
    const user = await UserProfile.findById(userId)
    user.following.push(userToFollowId)
    const currentUser = await user.save()

    const userToFollow = await UserProfile.findById(userToFollowId)
    userToFollow.followers.push(userId)
    const followingUser = await userToFollow.save()

    return {
      currentUser,
      followingUser,
    }
  }

  async checkUserFollowStatus(userId, userToFollowId) {
    const checkCurrentUserFollowingId = await UserProfile.findOne({
      _id: userId,
      following: userToFollowId,
    })

    console.log(checkCurrentUserFollowingId);

    if (checkCurrentUserFollowingId) {
      return true
    }

    const checkFollowingUsersCurrentUserId = await UserProfile.findOne({
      _id: userToFollowId,
      followers: userId,
    })

    if (checkFollowingUsersCurrentUserId) {
      return true
    }

    return false;
  }

  async checkIfUserIsAlreadyFollowing(userId, userToFollowId) {
    const isAlreadyFollowing = await UserProfile.findOne({
      _id: userId,
      following: userToFollowId,
    })
    if (isAlreadyFollowing) {
      return {
        isFollowing: true,
      }
    }
    return {
      isFollowing: false,
    }
  }
}
