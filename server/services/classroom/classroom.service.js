import Classroom from '../../models/classroom/classroom.model.js'
import ClassroomClasswork from '../../models/classroom/classroomClasswork.model.js'
import UserProfile from '../../models/user/userProfile.model.js'
import ClassroomRepository from '../../repositories/classroom.repository.js'
import { returnMessage } from '../../utils/returnMessage.js'
import { classroomUpdateValidator } from '../../validations/ClassroomValidator/classroom.validator.js'
import { validateClasswork } from '../../validations/ClassroomValidator/classwork.validator.js'

const classroomRepo = new ClassroomRepository()

const isAuthorizedUser = async (classId, userProfileId) => {
  try {
    const classroom = await classroomRepo.getClassroomById(classId)
    const userIsAuthorized =
      classroom.studentEmails.includes(userProfileId) ||
      classroom.adminEmails.includes(userProfileId)
    console.log({
      userIsAuthorized,
    })

    return userIsAuthorized
  } catch (error) {
    console.error(error.message)
    throw new Error(error.message)
  }
}

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
    if (!isAdmin) {
      delete classroomData.classroomJoinId
      delete classroomData.adminEmails
    }
    console.log({
      isAdmin,
      classroomData,
    })

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
  title,
  description,
  attachments,
  user
) => {
  try {
    const validateRequest = classroomUpdateValidator(
      classId,
      title,
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

    await classroomRepo.createUpdate(classroom, title, description, attachments, user)
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

export const getClassroomByIdService = async (user, classId, classroomUpdateId) => {
  try {
    console.log({ user, classId, classroomUpdateId })

    const classroom = await classroomRepo.getClassroomById(classId)
    const classroomUpdate = await classroomRepo.getClassroomUpdateById(
      classroomUpdateId
    )

    if (!classroomUpdate) {
      return returnMessage(401, { error: 'Classroom update not found' })
    }

    const userIsAuthorized =
      classroom.studentEmails.includes(user.userProfileId) ||
      classroom.adminEmails.includes(user.userProfileId)

    if (userIsAuthorized) {
      return returnMessage(200, {
        data: classroomUpdate,
        message: 'Classroom update found',
      })
    } else {
      return returnMessage(401, {
        message: 'Unauthorized: Classroom not found',
      })
    }
  } catch (error) {
    throw new Error(`Error in getClassroomByIdService: ${error.message}`)
  }
}

export const createClassroomClassworkService = async (userProfileId, classwork) => {
  try {
    const { classId, title, description, topic, attachments } = classwork
    const validateClassworkObj = validateClasswork(
      userProfileId,
      classId,
      title,
      description,
      topic,
      attachments
    )

    if (validateClassworkObj) {
      return validateClassworkObj
    }

    const classroom = await classroomRepo.getClassroomById(classId)
    if (!classroom.topics.includes(topic)) {
      classroom.topics.push(topic)
    }

    const isAuthorizedUser = classroom.adminEmails.includes(userProfileId)
    if (!isAuthorizedUser) {
      return returnMessage(401, { error: 'Unauthorized user' })
    }

    const newClasswork = await classroomRepo.createClassroomClasswork(
      classId,
      title,
      description,
      userProfileId,
      attachments,
      topic
    )

    if (!newClasswork) {
      return returnMessage(400, { error: 'Error in creating classwork' })
    }

    classroom.classWork.push(newClasswork._id)
    await classroom.save()
    return returnMessage(200, { message: 'Classwork created', data: newClasswork })
  } catch (error) {
    console.log(`Error in createClassroomClassworkService: ${error.message}`)
    throw new Error(error.message)
  }
}

export const getClassroomTopicsService = async (userProfileId, classId) => {
  try {
    const classroom = await classroomRepo.getClassroomById(classId)
    const isAuthorized =
      classroom.studentEmails.includes(userProfileId) ||
      classroom.adminEmails.includes(userProfileId)
    if (!isAuthorized) {
      return returnMessage(401, { error: 'Unauthorized user' })
    }
    return returnMessage(200, { data: classroom.topics })
  } catch (error) {
    console.log(`Error in getClassroomTopicsService: ${error.message}`)
    throw new Error(error.message)
  }
}

export const getClassroomWorksService = async (userProfileId, classId, topic) => {
  try {
    const isValidUser = await isAuthorizedUser(classId, userProfileId)
    if (!isValidUser) {
      return returnMessage(401, { error: 'Unauthorized user' })
    }

    const classwork = await ClassroomClasswork.find({ topic: topic })
    console.log(classwork)
    return returnMessage(200, { data: classwork })
  } catch (error) {
    console.log(`Error in getClassroomWorksService: ${error.message}`)
    throw new Error(error.message)
  }
}

export const getClassworkByIdService = async (userProfileId, classId, classworkId) => {
  try {
    const isValidUser = await isAuthorizedUser(classId, userProfileId)
    if (!isValidUser) {
      return returnMessage(401, { error: 'Unauthorized user' })
    }

    const classwork = await ClassroomClasswork.findById(classworkId).populate({
      path: 'postedBy',
      select: 'userProfileImage username',
    })
    console.log(classwork)
    return returnMessage(200, { data: classwork })
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
}
