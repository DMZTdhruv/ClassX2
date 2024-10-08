import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    about: { type: String, default: 'This is a user' },
    userProfileImage: { type: String, required: true, unique: true },
    enrollmentNumber: { type: String, unique: true, required: true },
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
    isPrivate: { type: Boolean, default: false },
    semesterNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester' },
    division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division' },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
    chatIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
    classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }],
    requestsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    suggestedUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
    gender: { type: 'String' },
    medals: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    groups: [{ type: String }],
    lastActiveOn: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
