import UserProfileRepository from '../../repositories/UserProfileRepository.js';
import { returnMessage } from '../../utils/returnMessage.js';

const userProfileRepo = new UserProfileRepository();
const getUserProfileDetailsService = async userId => {
  try {
    const user = await userProfileRepo.getUserProfileData(userId);
    console.log(user.data);
    return returnMessage(200, { data: user });
  } catch (error) {
    console.log(`Error in getUserProfileDetailsService service`);
    console.log(error.message);
    return returnMessage(403, { error: error.message });
  }
};

export default getUserProfileDetailsService;
