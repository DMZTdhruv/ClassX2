import mongoose from 'mongoose'

const classroomPostSchema = new mongoose.Schema(
  {
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
    description: { type: String, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: true,
    },
    attachments: [
      {
        type: String,
      },
    ],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
)

const ClassroomPost = mongoose.model('ClassroomPost', classroomPostSchema)

export default ClassroomPost
