import UserProfileRepository from '../../repositories/UserProfileRepository.js';
import { returnMessage } from '../../utils/returnMessage.js';

const userProfileRepo = new UserProfileRepository();

export default async function getSuggestedUserService(userProfileId) {
  try {
    const suggestedUserSet = new Set();

    const suggestedUsers = await userProfileRepo.getSuggestedUser(userProfileId);

    suggestedUsers.forEach(user => suggestedUserSet.add(user));
    if (suggestedUserSet.size < 5) {
      const following = await userProfileRepo.getFollowings(0, 10, userProfileId);
      following.forEach(user => suggestedUserSet.add(user));
    }

    return returnMessage(200, { data: Array.from(suggestedUserSet) });
  } catch (error) {
    console.log(error.message);
  }
}
