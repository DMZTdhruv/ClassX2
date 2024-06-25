import mongoose from 'mongoose';
import UserProfile from '../../models/user/userProfile.model.js';
import getFollowingService from '../../services/UserService/getFollowingService.js';

export async function getFollowingController(req, res) {
  try {
    console.log(req.body);
    const { page, limit } = req.query;
    const { currentUserProfileId } = req.params;
    const { userProfileId } = req.user;
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const { statusCode, response } = await getFollowingService(
      startIndex,
      itemsPerPage,
      currentUserProfileId,
      userProfileId
    );

    console.log(response);

    res.status(statusCode).json(response);
  } catch (error) {
    console.log(`Error in getFollowingController ${error.message}`);
    res.status(500).json(`Internal server error`);
  }
}

export async function getTotalFollowings(req, res) {
  try {
    const { userProfileId } = req.params;
    const aggregationPipeLine = [
      {
        $match: { _id: new mongoose.Types.ObjectId(userProfileId) },
      },
      {
        $project: {
          followingCount: { $size: '$following' },
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
