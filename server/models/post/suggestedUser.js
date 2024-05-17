import mongoose from 'mongoose';

const suggestedUser = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
  },
  { timestamps: true }
);

const SuggestedUser = mongoose.model('SuggestedUser', suggestedUser);

export default SuggestedUser;
