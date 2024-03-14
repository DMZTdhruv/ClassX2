import mongoose from 'mongoose'

const classroomClassworkModelSchema = new mongoose.Schema(
  {
    classworkTitle: { type: String, required: true },
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
    topic: [
      {
        type: String,
        required: true,
      },
    ],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
)

const ClassroomClasswork = mongoose.model(
  'ClassroomClasswork',
  classroomClassworkModelSchema
)

export default ClassroomClasswork
