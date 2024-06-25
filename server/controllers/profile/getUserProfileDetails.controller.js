import getUserProfileDetailsService from '../../services/UserService/getUserProfileDetailsService.js';

const getUserProfileDetailsController = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(req.query);
    const { statusCode, response } = await getUserProfileDetailsService(userId);

    console.log(response);
    if (response.error) {
      return res.status(statusCode).json({ error: response.error });
    }
    return res.status(statusCode).json({
      data: response.data,
      message: `Fetched userprofile successfully`,
    });
  } catch (error) {
    console.log(`Error in userProfileDetails controllers: ${error.message}`);
    res.status(500).json(`Internal server error`);
  }
};

export default getUserProfileDetailsController;
