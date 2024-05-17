import getFollowingService from '../../services/UserService/getFollowerService.js';

const getFollowersController = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { userProfileId } = req.params;
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const { statusCode, response } = await getFollowingService(
      startIndex,
      itemsPerPage,
      userProfileId
    );
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
  }
};

export default getFollowersController;
