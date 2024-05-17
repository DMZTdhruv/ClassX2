import PostRepository from '../../repositories/PostRepository.js';
import { returnMessage } from '../../utils/returnMessage.js';

const postRepo = new PostRepository();
const sendPostService = async (messageDetails, userProfileId) => {
  try {
    const { receiverIds, textMessage, postId } = messageDetails;

    await postRepo.sendPost(receiverIds, userProfileId, postId, textMessage);

    return returnMessage(201, { message: 'Successfully sent.' });
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default sendPostService;
