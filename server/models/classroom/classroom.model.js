import mongoose from 'mongoose'

const classroomSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    classroomJoinId: {
      type: String,
      unique: true,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    adminEmails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
      },
    ],
    studentEmails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
      },
    ],
    updates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassroomPost',
      },
    ],
    classWork: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassroomClasswork',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: true,
    },
  },
  { timestamps: true }
)

const Classroom = mongoose.model('Classroom', classroomSchema)
export default Classroom
