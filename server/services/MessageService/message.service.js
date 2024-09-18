import Conversation from '../../models/messages/conversation.model.js';
import Message from '../../models/messages/message.model.js';
import { getSocketIdByUserId, io } from '../../socket/socket.js';
import { returnMessage } from '../../utils/returnMessage.js';
import { getMessageValidator } from '../../validations/MessageValidator/message.validator.js';

// Helper function to create a new message
export const createNewMessage = (messageBody, senderId, receiverId, conversationId) => {
  const baseMessage = {
    senderId,
    receiverId,
    message: messageBody.message,
    replyMessage: {
      replyToUsername: messageBody.repliedUser,
      replyMessage: messageBody.repliedMessage,
    },
    conversationId,
  };

  if (messageBody?.repliedAsset?.url !== '') {
    baseMessage.repliedAsset = messageBody.repliedAsset;
  }

  if (messageBody?.asset) {
    baseMessage.asset = {
      extension: messageBody.asset.extension,
      url: messageBody.asset.url,
      originalFileName: messageBody.asset?.originalFileName || '',
    };
  }

  if (messageBody?.postId) {
    baseMessage.post = messageBody.postId;
  }

  return new Message(baseMessage);
};

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

    const newMessage = createNewMessage(
      messageBody,
      senderId,
      receiverId,
      conversation._id
    );

    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getSocketIdByUserId(receiverId);

    const messageData = messageBody?.postId
      ? await newMessage.populate({
          path: 'post',
          select: 'attachments aspectRatio caption',
          populate: {
            path: 'postedBy',
            select: 'userProfileImage username',
          },
          
        })
      : newMessage;

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', messageData);
    }

    console.log(newMessage);
    return res
      .status(201)
      .json({ message: 'Message created successfully', data: newMessage });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const conversationSendMessageService = async (
  messageBody,
  senderId,
  receiverId
) => {
  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = createNewMessage(
      messageBody,
      senderId,
      receiverId,
      conversation._id
    );

    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getSocketIdByUserId(receiverId);

    const messageData = messageBody?.postId
      ? await newMessage.populate({
          path: 'post',
          select: 'attachments aspectRatio caption',
          populate: {
            path: 'postedBy',
            select: 'userProfileImage username',
          },
        })
      : newMessage;

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', messageData);
    }

    return res
      .status(201)
      .json({ message: 'Message created successfully', data: newMessage });
  } catch (error) {
    throw new Error(`Error in conversationSendMessageService ${error.message}`);
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
      .populate('senderId', 'username userProfileImage')
      .populate('receiverId', 'username userProfileImage')
      .populate({
        path: 'post',
        select: 'attachments aspectRatio caption',
        populate: {
          path: 'postedBy',
          select: 'userProfileImage username',
        },
      });

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
        error: 'Internal server error',
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

    const totalMessages = await Message.countDocuments({
      conversationId: conversation._id,
    });

    console.log({ totalMessages });
    return {
      statusCode: 200,
      response: {
        message: 'Message received successfully',
        data: totalMessages,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      response: {
        error: 'Internal server error',
      },
    };
  }
};

export const getTotalConversationMessagesService = async (senderId, receiverId) => {
  try {
    if (!senderId || !receiverId) {
      return returnMessage(400, { error: `Incomplete details` });
    }

    const messages = await Message.countDocuments({
      senderId: senderId,
      receiverId: receiverId,
    });
    return returnMessage(200, { data: messages });
  } catch (error) {
    throw new Error(`Error in getTotalConversationMessagesService `, error.message);
  }
};

export const deleteMessageService = async (deleteId, receiverId) => {
  try {
    const message = await Message.findByIdAndDelete(deleteId);
    const receiverSocketId = getSocketIdByUserId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('deletedMessage', deleteId);
    }

    if (message) {
      io.emit('delete-message');
      return {
        statusCode: 201,
        response: {
          message: 'Message deleted successfully',
        },
      };
    } else {
      return {
        statusCode: 404,
        response: {
          error: 'Message not found',
        },
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      response: {
        error: 'Internal server error',
      },
    };
  }
};
