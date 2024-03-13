import ClassroomRepositoryInterface from '../interfaces/classroom.interface.js'
import Classroom from '../models/classroom/classroom.model.js'
import UserProfile from '../models/user/userProfile.model.js'

export default class ClassroomRepository extends ClassroomRepositoryInterface {
  async createClassroom(className, branch, division, semester, user) {
    const userProfile = await UserProfile.findById(user.userProfileId)
    const classroom = await Classroom.create({
      className,
      branch,
      division,
      semester,
      adminEmails: [user.userProfileId],
      createdBy: user.userProfileId,
    })
    userProfile.classrooms.push(classroom._id)
    await userProfile.save()
  }

  async getAllClassrooms(user) {
    const userProfile = await UserProfile.find({ _id: user.userProfileId })
      .select('classrooms')
      .populate({
        path: 'classrooms',
        populate: {
          path: 'createdBy',
          select: 'username',
        },
      })
    return userProfile
  }
}
