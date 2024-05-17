import sendPostService from '../../services/PostService/sendPostService.js';

export const sendPostController = async (req, res) => {
  try {
    const { messageDetails } = req.body;
    const { userProfileId } = req.user;
    console.log(messageDetails);

    const { statusCode, response } = await sendPostService(
      messageDetails,
      userProfileId
    );

    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({ error: `Internal server error.` });
  }
};
