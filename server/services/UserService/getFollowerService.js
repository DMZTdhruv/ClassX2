import UserProfileRepository from '../../repositories/UserProfileRepository.js';
import { returnMessage } from '../../utils/returnMessage.js';

const userRepo = new UserProfileRepository();
const getFollowingService = async (startIndex, itemsPerPage, userProfileId) => {
  try {
    const userFollowingList = await userRepo.getFollowers(
      startIndex,
      itemsPerPage,
      userProfileId
    );

    return returnMessage(200, { data: userFollowingList });
  } catch (error) {
    console.log(`Error in ${error.message}`);
    throw new Error(error.message);
  }
};

export default getFollowingService;
