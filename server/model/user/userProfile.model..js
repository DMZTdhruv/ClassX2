import mongoose from "mongoose";

//removed userID because mongoose will generate by itself
const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrollmentNumber: { type: String, unique: true, required: true },
  branch: { type: String, required: true },
  division: { type: String, required: true },
  semester: { type: Number, required: true },
  isPrivate: { type: Boolean, default: false },
  friends: [{ type: String }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  medals: { type: Number, default: 0 },
  totalPoints: { type: Number, default: 0 },
  groups: [{ type: String }],
}, { timestamps: true });

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;