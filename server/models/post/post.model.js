import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String },
  caption: { type: String, required: true },
  location: { type: String, default: "" },
  category: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;