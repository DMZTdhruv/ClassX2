import { returnMessage } from '../../utils/returnMessage.js';

export function validateClasswork(
  userProfileId,
  classId,
  title,
  description,
  topic,
  attachments
) {
  if (
    !userProfileId ||
    !classId ||
    !title ||
    !description ||
    !topic ||
    attachments.length === 0
  ) {
    console.log(attachments);
    return returnMessage(400, { error: 'Incomplete details' });
  }
}
