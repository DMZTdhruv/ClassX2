import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    enrollmentNumber: { type: String, unique: true, required: true },
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }], // Use Branch schema from the branchModel
    isPrivate: { type: Boolean, default: false },
    friends: [{ type: String }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    medals: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    groups: [{ type: String }],
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
