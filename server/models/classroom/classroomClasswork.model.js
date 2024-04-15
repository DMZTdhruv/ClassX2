import mongoose from 'mongoose'

const classroomClassworkModelSchema = new mongoose.Schema(
  {
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: true,
    },
    attachments: [
      {
        _id: String,
        originalFilename: String,
        url: String,
        extension: String,
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
