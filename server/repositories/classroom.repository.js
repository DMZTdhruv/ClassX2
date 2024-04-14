import ClassroomRepositoryInterface from '../interfaces/classroom.interface.js'
import Classroom from '../models/classroom/classroom.model.js'
import UserProfile from '../models/user/userProfile.model.js'
import ClassroomPost from '../models/classroom/classroomPost.model.js'

export default class ClassroomRepository extends ClassroomRepositoryInterface {
  async createClassroom(className, classroomJoinId, branch, division, semester, user) {
    const userProfile = await UserProfile.findById(user.userProfileId)
    const classroom = await Classroom.create({
      className,
      classroomJoinId,
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

  async getClassroomById(classId) {
    return await Classroom.findById(classId)
  }

  async getClassroomMinimalData(classId) {
    const classroom = await Classroom.findById(classId).select(
      'className branch division semester adminEmails classroomJoinId updates'
    )

    return {
      _id: classroom._id,
      className: classroom.className,
      branch: classroom.branch,
      division: classroom.division,
      semester: classroom.semester,
      classroomJoinId: classroom.classroomJoinId,
      adminEmails: classroom.adminEmails,
      updates: classroom.updates.length,
    }
  }

  //send empty array incase of no attachments
  async createUpdate(classroom, title, description, attachments, user) {
    const classroomPost = await ClassroomPost.create({
      classId: classroom._id,
      title: title,
      description: description,
      attachments: attachments,
      postedBy: user.userProfileId,
    })

    classroom.updates.push(classroomPost._id)
    classroom.save()
  }

  async getClassroomUpdate(startIndex, itemsPerPage, classId) {
    const updates = await ClassroomPost.find({ classId: classId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'postedBy',
        select: 'username userProfileImage',
      })
      .skip(startIndex)
      .limit(itemsPerPage)
    return updates
  }

  async getClassroomByJoinClassroomId(classroomJoinId) {
    return await Classroom.findOne({ classroomJoinId })
  }

  async getClassroomUpdateById(classroomUpdateId) {
    const update = await ClassroomPost.findById(classroomUpdateId)
      .populate({
        path: 'postedBy',
        select: 'username userProfileImage',
      })
    return update;
  }
}
