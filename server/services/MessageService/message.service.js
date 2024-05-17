import Conversation from '../../models/messages/conversation.model.js';
import Message from '../../models/messages/message.model.js';
import UserProfile from '../../models/user/userProfile.model.js';
import { getSocketIdByUserId, io } from '../../socket/socket.js';
import { getMessageValidator } from '../../validations/MessageValidator/message.validator.js';

export const messageService = async (messageBody, senderId, receiverId, res) => {
  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    let newMessage;
    if (messageBody?.postId) {
      newMessage = new Message({
        senderId,
        receiverId,
        message: messageBody.message,
        replyMessage: {
          replyToUsername: messageBody.repliedUser,
          replyMessage: messageBody.repliedMessage,
        },
        post: messageBody.postId,
        conversationId: conversation._id,
      });
    } else {
      newMessage = new Message({
        senderId,
        receiverId,
        message: messageBody.message,
        replyMessage: {
          replyToUsername: messageBody.repliedUser,
          replyMessage: messageBody.repliedMessage,
        },
        conversationId: conversation._id,
      });
    }

    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getSocketIdByUserId(receiverId);

    let messageData;
    if (messageBody?.postId) {
      messageData = await newMessage.populate({
        path: 'post',
        select: 'attachments aspectRatio caption',
        populate: {
          path: 'postedBy',
          select: 'userProfileImage username',
        },
      });
    } else {
      messageData = newMessage;
    }

    if (receiverSocketId) {
      console.log(newMessage);
      io.to(receiverSocketId).emit('newMessage', messageData);
      console.log({receiverSocketId, messageData});
    }

    return res
      .status(201)
      .json({ message: 'Message created successfully', data: newMessage });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessageService = async (
  startIndex,
  itemsPerPage,
  senderId,
  receiverId
) => {
  try {
    getMessageValidator(senderId, receiverId);
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      return {
        statusCode: 200,
        response: {
          message: 'Message received successfully',
          data: [],
        },
      };
    }

    const conversationMessages = await Message.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(itemsPerPage)
      .populate({
        path: 'senderId',
        select: 'username userProfileImage',
      })
      .populate({
        path: 'receiverId',
        select: 'username userProfileImage',
      })
      .populate({
        path: 'post',
        select: 'attachments aspectRatio caption',
        populate: {
          path: 'postedBy',
          select: 'userProfileImage username',
        },
      });

    console.log(conversationMessages[0]);
    if (!conversationMessages) {
      return {
        statusCode: 200,
        response: {
          message: 'Message received successfully',
          data: [],
        },
      };
    }

    return {
      statusCode: 200,
      response: {
        message: 'Message received successfully',
        data: conversationMessages.reverse(),
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      response: {
        error: `Internal server error`,
      },
    };
  }
};

export const getTotalMessageService = async (senderId, receiverId) => {
  try {
    getMessageValidator(senderId, receiverId);
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      return {
        statusCode: 200,
        response: {
          message: 'Message received successfully',
          data: 0,
        },
      };
    }

    const totalConversationMessages = await Message.find({
      conversationId: conversation._id,
    }).countDocuments({});

    return {
      statusCode: 200,
      response: {
        message: 'Message received successfully',
        data: totalConversationMessages,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      response: {
        error: `Internal server error`,
      },
    };
  }
};

export const deleteMessageService = async (deleteId, receiverId) => {
  try {
    const message = await Message.findByIdAndDelete(deleteId);
    const receiverSocketId = getSocketIdByUserId(receiverId);
    io.to(receiverSocketId).emit('deletedMessage', deleteId);
    if (message) {
      io.emit('delete-message');
      return {
        statusCode: 201,
        response: {
          message: 'deleted successfully',
        },
      };
    } else {
      return {
        statusCode: 201,
        response: {
          error: 'Failed to delete message',
        },
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};
