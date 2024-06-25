import UserProfile from '../../models/user/userProfile.model.js';
import {
  messageService,
  getMessageService,
  getTotalMessageService,
  deleteMessageService,
  getTotalConversationMessagesService,
} from '../../services/MessageService/message.service.js';
import { messageValidator } from '../../validations/MessageValidator/message.validator.js';

export const sendMessage = async (req, res) => {
  try {
    const { messageBody } = req.body;
    console.log(req.body);

    const { id: receiverId } = req.params;
    const senderId = req.user.userProfileId;

    // checking message details
    messageValidator(messageBody, senderId, receiverId, res);

    // creating conversation and message
    await messageService(messageBody, senderId, receiverId, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { page, limit } = req.query;
    console.log(req.query);
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const startIndex = (currentPage - 1) * itemsPerPage;

    const { id: receiverId } = req.params;
    const senderId = req.user.userProfileId;

    const { statusCode, response } = await getMessageService(
      startIndex,
      itemsPerPage,
      senderId,
      receiverId
    );

    res.status(statusCode).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTotalMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.userProfileId;

    const { statusCode, response } = await getTotalMessageService(senderId, receiverId);

    return res.status(statusCode).json(response);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTotalConversationMessages = async (req, res) => {
  try {
    const { userProfileId } = req.user;
    const { receiverId } = req.params;
    console.log({ userProfileId, receiverId });
    const { statusCode, response } = await getTotalConversationMessagesService(
      userProfileId,
      receiverId
    );
    console.log(response);
    //I actually wrote res.status(statusCode, response)
    return res.status(statusCode).json(response);
  } catch (error) {
    console.log(`Error in getTotalConversationMessages`, error.message);
    return res.status(500).json({ error: `Internal server error` });
  }
};

export const getUsersForSideBar = async (req, res) => {
  const { userProfileId } = req.user;
  const { page, limit } = req.query;

  console.log(req.query);
  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

  try {
    const user = await UserProfile.findById(userProfileId);

    const followingUsers = await UserProfile.find({
      _id: { $in: user.following },
    }).select('username userProfileImage lastActiveOn');

    const sideBarUsers = await UserProfile.findById(userProfileId)
      .select({
        path: 'following',
        select: 'username userProfileImage lastActiveOn',
      })
      .skip(startIndex)
      .limit(itemsPerPage);

    return res.status(200).json({
      message: 'Follow some users or send messages to start conversation',
      data: followingUsers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(`Error in chat controller: ${error.message}`);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const deleteId = req.params.deleteId;
    const receiverId = req.body.receiverId;
    const { statusCode, response } = await deleteMessageService(deleteId, receiverId);
    return res.status(statusCode).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
