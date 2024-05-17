import PostRepositoryInterface from '../interfaces/PostRepositoryInterface.js';
import UserProfile from '../models/user/userProfile.model.js';
import Comment from '../models/comment/comment.model.js';
import ReplyComment from '../models/comment/repliedComment.model.js';
import PostSchema from '../models/post/postSchema.model..js';
import Conversation from '../models/messages/conversation.model.js';
import Message from '../models/messages/message.model.js';
import { getSocketIdByUserId, io } from '../socket/socket.js';

export default class PostRepository extends PostRepositoryInterface {
  async savePost() {
    return PostSchema.save();
  }

  async getUserProfile(userID) {
    return UserProfile.findOne({ userID });
  }

  async pushPostInUserProfile(userID, postId) {
    const userProfile = await UserProfile.findOne({ _id: userID });
    userProfile.posts.push(postId);
    return userProfile.save();
  }

  async findPostById(postId) {
    return await PostSchema.findById(postId)
      .populate({
        path: 'postedBy',
        model: 'UserProfile',
        select: 'username userProfileImage',
      })
      .populate({
        path: 'comments',
        model: 'Comment',
        options: { sort: { createdAt: -1 } },
        populate: [
          {
            path: 'postedBy',
            model: 'UserProfile',
            select: 'username userProfileImage',
          },
        ],
      });
  }

  async findPostByIdWithPostedBy(postId) {
    return await PostSchema.findById(postId).populate({
      path: 'postedBy',
      model: 'UserProfile',
      select: 'username userProfileImage',
    });
  }

  async deletePostById(post, userProfileId) {
    if (post.comments.length > 0) {
      const comment = post.comments;
      for (let i = 0; i < comment.length; i++) {
        const commentId = comment[i];
        await ReplyComment.deleteMany({ parentCommentId: commentId });
        await Comment.deleteOne(commentId);
      }
    }
    const user = await UserProfile.findById(userProfileId);
    await user.posts.remove(post._id);
    await user.savedPosts.remove(post._id);
    await user.save();
    await post.deleteOne();
  }

  async sendPost(userIds, senderId, postId, textMessage) {
    try {
      const conversations = await Promise.all(
        userIds.map(async userId => {
          let conversation = await Conversation.findOne({
            participants: { $all: [senderId, userId] },
          });
          if (!conversation) {
            conversation = await Conversation.create({
              participants: [senderId, userId],
            });
          }
          return conversation;
        })
      );

      await Promise.all(
        userIds.map(async (userId, index) => {
          const newMessage = new Message({
            senderId,
            receiverId: userId,
            post: postId,
            message: textMessage,
            conversationId: conversations[index]._id,
          });

          conversations[index].messages.push(newMessage);
          await Promise.all([conversations[index].save(), newMessage.save()]);

          const messageData = await newMessage.populate({
            path: 'post',
            select: 'attachments aspectRatio caption',
            populate: {
              path: 'postedBy',
              select: 'userProfileImage username',
            },
          });

          const receiverSocketId = getSocketIdByUserId(userId);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', messageData);
          }
        })
      );
    } catch (error) {
      console.error('Error sending post:', error);
      throw error;
    }
  }
}
