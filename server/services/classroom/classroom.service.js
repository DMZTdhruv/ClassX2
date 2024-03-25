import UserProfile from '../../models/user/userProfile.model.js'
import ClassroomRepository from '../../repositories/classroom.repository.js'
import { classroomUpdateValidator } from '../../validations/ClassroomValidator/classroom.validator.js'

const classroomRepo = new ClassroomRepository()
export const createClassroomService = async (
  className,
  classroomJoinId,
  branch,
  division,
  semester,
  user
) => {
  try {
    await classroomRepo.createClassroom(
      className,
      classroomJoinId,
      branch,
      division,
      semester,
      user
    )
    return {
      statusCode: 201,
      response: {
        message: `Created classroom successfully`,
      },
    }
  } catch (error) {
    console.log(`Error in classroom service: ${error.message}`)
    throw new Error(error.message)
  }
}

export const getAllClassroomsService = async user => {
  try {
    const classrooms = await classroomRepo.getAllClassrooms(user)
    return {
      statusCode: 200,
      response: {
        message: `Received classrooms successfully`,
        data: classrooms[0].classrooms,
      },
    }
  } catch (error) {
    throw new Error(`Error in getAllClassroomsService ${error.message}`)
  }
}

export const getClassroomService = async (classId, user) => {
  try {
    const classroom = await classroomRepo.getClassroomMinimalData(classId)
    const classroomData = classroom
    const isAdmin = classroom.adminEmails.includes(user.userProfileId)
    if (!isAdmin) delete classroomData.classroomJoinId
    console.log(classroom)

    return {
      statusCode: 200,
      response: {
        message: `Data received successfully`,
        data: classroomData,
      },
    }
  } catch (error) {
    throw new Error(`Error in getClassroomService ${error.message}`)
  }
}

export const createClassroomUpdatesService = async (
  classId,
  description,
  attachments,
  user
) => {
  try {
    const validateRequest = classroomUpdateValidator(
      classId,
      description,
      attachments,
      user
    )
    if (validateRequest) {
      return {
        statusCode: 400,
        response: {
          error: `Incomplete details`,
        },
      }
    }

    const classroom = await classroomRepo.getClassroomById(classId)
    const isAdmin = classroom.adminEmails.includes(user.userProfileId)
    if (!isAdmin) {
      return {
        statusCode: 401,
        response: {
          error: `You are not the admin`,
        },
      }
    }

    await classroomRepo.createUpdate(classroom, description, attachments, user)
    return {
      statusCode: 201,
      response: {
        message: `Successfully created post`,
      },
    }
  } catch (error) {
    throw new Error(`Error in createClassroomUpdatesService ${error.message}`)
  }
}

export const getClassroomUpdateService = async (startIndex, itemsPerPage, classId) => {
  try {
    const updates = await classroomRepo.getClassroomUpdate(
      startIndex,
      itemsPerPage,
      classId
    )

    return {
      statusCode: 200,
      response: {
        message: `Successfully received posts`,
        data: updates,
      },
    }
  } catch (error) {
    throw new Error(`Error in getClassroomUpdateService ${error.message}`)
  }
}

export const joinClassroomService = async (user, classroomJoinId) => {
  try {
    const classroom = await classroomRepo.getClassroomByJoinClassroomId(classroomJoinId)
    console.log(classroom)
    const isAdminPresent = classroom.adminEmails.includes(user.userProfileId)
    const isUserPresent = classroom.studentEmails.includes(user.userProfileId)

    if (isAdminPresent || isUserPresent) {
      return {
        statusCode: 400,
        response: {
          error: `You have already joined this classroom`,
        },
      }
    }

    const userProfile = await UserProfile.findById(user.userProfileId)
    userProfile.classrooms.push(classroom._id)
    classroom.studentEmails.push(user.userProfileId)

    await Promise.all([userProfile.save(), classroom.save()])

    return {
      statusCode: 201,
      response: {
        message: `Successfully joined the classroom!`,
      },
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
