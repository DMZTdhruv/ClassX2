import ClassroomRepositoryInterface from '../interfaces/classroom.interface.js'
import Classroom from '../models/classroom/classroom.model.js'
import UserProfile from '../models/user/userProfile.model.js'
import ClassroomPost from '../models/classroom/classroomPost.model.js'
import ClassroomClasswork from '../models/classroom/classroomClasswork.model.js'

export default class ClassroomRepository extends ClassroomRepositoryInterface {
  async createClassroom(
    className,
    classroomJoinId,
    classroomAdminJoinId,
    branch,
    division,
    semester,
    user
  ) {
    const userProfile = await UserProfile.findById(user.userProfileId)
    const classroom = await Classroom.create({
      className,
      classroomJoinId,
      classroomAdminJoinId,
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
      'className branch division semester adminEmails classroomAdminJoinId classroomJoinId updates'
    )

    return {
      _id: classroom._id,
      className: classroom.className,
      branch: classroom.branch,
      division: classroom.division,
      semester: classroom.semester,
      classroomAdminJoinId: classroom.classroomAdminJoinId,
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
    const classroom = await Classroom.findOne({ classroomJoinId })
    return classroom
  }

  async getClassroomByAdminJoinId(classroomAdminJoinId) {
    return await Classroom.findOne({ classroomAdminJoinId })
  }

  async getClassroomUpdateById(classroomUpdateId) {
    const update = await ClassroomPost.findById(classroomUpdateId).populate({
      path: 'postedBy',
      select: 'username userProfileImage',
    })
    return update
  }

  async createClassroomClasswork(
    classId,
    title,
    description,
    userProfileId,
    attachments,
    topic
  ) {
    const classwork = await ClassroomClasswork.create({
      classId,
      title,
      description,
      postedBy: userProfileId,
      attachments,
      topic,
    })

    return await classwork.save()
  }

  async isAdmin(userProfileId, classId) {
    const classroom = await Classroom.findById(classId).select('adminEmails')
    console.log(classroom)
    return classroom.adminEmails.includes(userProfileId)
  }

  async getClassroomAdmins(classId) {
    const classroomAdmins = await Classroom.findById(classId)
      .populate({
        path: 'adminEmails',
        select: 'username userProfileImage -_id',
      })
      .select('adminEmails')

    return classroomAdmins.adminEmails
  }

  async getClassroomStudents(classId) {
    const classroomStudents = await Classroom.findById(classId)
      .populate({
        path: 'studentEmails',
        select: 'username userProfileImage',
      })
      .select('studentEmails')

    return classroomStudents.studentEmails
  }

  async deleteUpdateById(updateId) {
    return await ClassroomPost.findByIdAndDelete(updateId)
  }

  async deleteClassroomById(classId) {
    try {
      await UserProfile.updateMany(
        { classrooms: classId },
        { $pull: { classrooms: classId } }
      )

      await ClassroomClasswork.deleteMany({ classId })
      await ClassroomPost.deleteMany({ classId })
      return true
    } catch (error) {
      return false
    }
  }

  async deleteClassworkById(classId, userProfileId, classworkId) {
    const classroom = await Classroom.findById(classId)
    if (!classroom.adminEmails.includes(userProfileId)) {
      return false
    }
    classroom.classWork.remove(userProfileId)
    await Promise.all([
      ClassroomClasswork.findByIdAndDelete(classworkId),
      classroom.save(),
    ])
    return true
  }

  async deleteStudentFromClassroom(classId, userProfileId, deleteStudentId) {
    const [classroom, user] = await Promise.all([
      Classroom.findById(classId),
      UserProfile.findById(deleteStudentId),
    ])

    if (!classroom.adminEmails.includes(userProfileId)) {
      return false
    }

    if (!classroom.studentEmails.includes(deleteStudentId)) {
      return false
    }

    user.classrooms.remove(classroom._id)
    classroom.studentEmails.remove(deleteStudentId)

    await Promise.all([user.save(), classroom.save()])
    return true
  }
}
