// socket.js
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import UserProfile from '../models/user/userProfile.model.js';
import {
  conversationSendMessageService,
  createNewMessage,
} from '../services/MessageService/message.service.js';
import Conversation from '../models/messages/conversation.model.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: [
    //   `http://localhost:3000`,
    //   `https://classxfrontend-production.up.railway.app`,
    //   'https://classx.up.railway.app',
    //   'https://classx2-clientbackup.onrender.com',
    // ],

    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const users = {};

export const getSocketIdByUserId = receiverId => {
  return users[receiverId];
};

io.on('connection', socket => {
  const userId = socket.handshake.query.userId;
  console.log(`${userId} : Is connected`);

  if (userId) {
    users[userId] = socket.id;
  }

  socket.on('typing-message', (senderId, receiverId, currentStatus) => {
    socket
      .to(users[receiverId])
      .emit('typingStarted', { status: currentStatus, receiverId: senderId });
  });

  socket.on('hello', message => {
    console.log(message);
  });

  socket.on('private_message_CtoS', async message => {
    try {
      const { senderId, receiverId, messageBody } = message;
      console.log({ senderId, receiverId, messageBody });

      console.log(message.messageBody);
      await sendConversationMessage(senderId, receiverId, messageBody);
    } catch (error) {
      console.log(error.message);
    }
  });

  const sendConversationMessage = async (senderId, receiverId, messageBody) => {
    if (!senderId || !receiverId || !messageBody) {
      throw new Error('Invalid parameters');
    }
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

      const messageData = messageBody?.postId
        ? await newMessage
            .populate({
              path: 'post',
              select: 'attachments aspectRatio caption',
              populate: {
                path: 'postedBy',
                select: 'userProfileImage username',
              },
            })
            .populate({
              path: 'senderId',
              select: 'userProfileImage username',
            })
            .populate({
              path: 'receiverId',
              select: 'userProfileImage username',
            })
        : await newMessage.populate({
            path: 'senderId receiverId',
            select: 'userProfileImage username',
          });

      console.log(messageData);

      const socketIdOfReceiver = getSocketIdByUserId(receiverId);
      const socketIdOfSender = getSocketIdByUserId(senderId);
      if (socketIdOfSender) {
        console.log(users[senderId]);
        io.to(users[senderId]).emit('private_message_StoC_response', {
          status: true,
          message: messageData,
        });
      }

      if (socketIdOfReceiver) {
        io.to(users[receiverId]).emit('private_message_StoC', {
          receivedMessage: messageData,
        });
      }
    } catch (error) {
      throw new Error(`Error in sendSocketConversationMessage func ${error.message}`);
    }
  };

  // active users info when they get online
  io.emit('activeUsers', Object.keys(users));

  // A user disconnects
  socket.on('disconnect', () => {
    console.log(`User ${userId} got disconnected`);
    updateActiveStatus(userId);
    delete users[userId];
    io.emit('activeUsers', Object.keys(users));
  });

  const updateActiveStatus = async userId => {
    try {
      const userProfile = await UserProfile.findById(userId);
      const lastActiveDate = new Date().toISOString();
      console.log(`${userProfile.username} was last seen active at ${lastActiveDate}`);
      userProfile.lastActiveOn = lastActiveDate;
      userProfile.save();
    } catch (error) {
      console.log(error.message);
    }
  };
});

export { app, io, server };
