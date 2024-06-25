import mongoose from 'mongoose';
import UserProfile from '../../models/user/userProfile.model.js';
import getFollowerService from '../../services/UserService/getFollowerService.js';

export const getFollowersController = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { userProfileId } = req.params;
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const { statusCode, response } = await getFollowerService(
      startIndex,
      itemsPerPage,
      userProfileId
    );

    console.log(response);
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
  }
};



export async function getTotalFollowers(req, res) {
  try {
    const { userProfileId } = req.params;
    const aggregationPipeLine = [
      {
        $match: { _id: new mongoose.Types.ObjectId(userProfileId) },
      },
      {
        $project: {
          followerCount: { $size: '$followers' },
        },
      },
    ];

    const result = await UserProfile.aggregate(aggregationPipeLine);
    if (result.length === 0) {
      return res.status(404).json({ error: `User profile not found` });
    }
    res.status(201).json({ data: result[0] });
  } catch (error) {
    console.log(`Error in getTotalFollowings controller ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
}
