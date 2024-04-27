import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    attachments: [
      {
        _id: String,
        originalFilename: String,
        url: String,
        extension: String,
        _createdAt: String,
      },
    ],
    aspectRatio: { type: String, default: '1:1' },
    caption: { type: String, required: true },
    location: { type: String, default: '' },
    category: { type: String },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
  },
  { timestamps: true }
)

const PostSchema = mongoose.model('PostSchema', postSchema)

export default PostSchema
