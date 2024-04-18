import {
  createClassroomClassworkService,
  createClassroomService,
  createClassroomUpdatesService,
  deleteClassroomByIdService,
  deleteClassroomUpdateByIdService,
  deleteClassworkByIdService,
  deleteStudentService,
  getAllClassroomsService,
  getClassroomAdminsService,
  getClassroomByIdService,
  getClassroomService,
  getClassroomStudentsService,
  getClassroomTopicsService,
  getClassroomUpdateService,
  getClassroomWorksService,
  getClassworkByIdService,
  joinClassroomByAdminIdService,
  joinClassroomService,
  unEnrolClassroomService,
} from '../../services/classroom/classroom.service.js'

export const createClassroomController = async (req, res) => {
  try {
    const user = req.user
    console.log(req.body)
    const {
      className,
      classroomJoinId,
      classroomAdminJoinId,
      branch,
      division,
      semester,
    } = req.body
    const { statusCode, response } = await createClassroomService(
      className,
      classroomJoinId,
      classroomAdminJoinId,
      branch,
      division,
      semester,
      user
    )
    res.status(statusCode).json(response)
  } catch (error) {
    res.status(500).json({ error: `Internal server error` })
  }
}

export const getAllClassroom = async (req, res) => {
  try {
    const user = req.user
    const { statusCode, response } = await getAllClassroomsService(user)
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in getAllClassroom controller: ${error.message} `)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const getClassroom = async (req, res) => {
  try {
    const { classId } = req.params
    const user = req.user
    const { statusCode, response } = await getClassroomService(classId, user)
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in getClassroomController ${error.message}`)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const joinClassroomController = async (req, res) => {
  try {
    const { classroomJoinId } = req.body
    console.log({ classroomJoinId })
    const user = req.user
    const { statusCode, response } = await joinClassroomService(user, classroomJoinId)
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in ${error.message}`)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const joinClassroomByAdminId = async (req, res) => {
  try {
    const { classroomAdminJoinId } = req.body
    console.log({ classroomAdminJoinId })
    const user = req.user
    console.log({ user })
    const { statusCode, response } = await joinClassroomByAdminIdService(
      user,
      classroomAdminJoinId
    )
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in ${error.message}`)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const createClassroomUpdate = async (req, res) => {
  try {
    const user = req.user
    const { classId, title, description, attachments } = req.body

    const { statusCode, response } = await createClassroomUpdatesService(
      classId,
      title,
      description,
      attachments,
      user
    )
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in createClassroomUpdate controller: ${error.message} `)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const getClassroomUpdates = async (req, res) => {
  try {
    const { page, limit } = req.query
    console.log(req.query)
    const currentPage = parseInt(page) || 1
    const itemsPerPage = parseInt(limit) || 10
    const startIndex = (currentPage - 1) * itemsPerPage

    const { classId } = req.params
    const { statusCode, response } = await getClassroomUpdateService(
      startIndex,
      itemsPerPage,
      classId
    )
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in createClassroomUpdate controller: ${error.message} `)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const getClassroomUpdate = async (req, res) => {
  try {
    const { classId, updateId } = req.params
    const user = req.user
    const { statusCode, response } = await getClassroomByIdService(
      user,
      classId,
      updateId
    )
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in getClassroomUpdateController: ${error.message}`)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const createClassroomClasswork = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { classroomObj } = req.body
    console.log(req.body)

    console.log({
      userProfileId,
      classroomObj,
    })

    const { statusCode, response } = await createClassroomClassworkService(
      userProfileId,
      classroomObj
    )

    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in createClassroomClasswork ${error.message}`)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getClassroomTopics = async (req, res) => {
  try {
    const { classId } = req.params
    const { userProfileId } = req.user

    const { statusCode, response } = await getClassroomTopicsService(
      userProfileId,
      classId
    )
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in getClassroomTopics ${error.message}`)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getClassroomWork = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { classId, topicId } = req.params
    console.log(req.params)
    const { statusCode, response } = await getClassroomWorksService(
      userProfileId,
      classId,
      topicId
    )

    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in getClassroomWorks ${error.message}`)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getClassworkById = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { classId, classworkId } = req.params
    console.log({
      userProfileId,
      params: req.params,
    })

    console.log(`HELLOOOOOOOOOOOOOOOOOOOOOO WOOOOOOOOOORRRRRRRLLLLLLLDDDDDDDDD`)

    const { statusCode, response } = await getClassworkByIdService(
      userProfileId,
      classId,
      classworkId
    )
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in getClassworkById ${error.message}`)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getClassroomAdmins = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { classId } = req.params

    const { statusCode, response } = await getClassroomAdminsService(
      userProfileId,
      classId
    )

    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`getClassroomAdmins error ${error.message}`)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getClassroomStudents = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { classId } = req.params
    const { statusCode, response } = await getClassroomStudentsService(
      userProfileId,
      classId
    )
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`getClassroomStudents error ${error.message}`)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteClassroomUpdateById = async (req, res) => {
  try {
    const { classId, updateId } = req.params
    const { userProfileId } = req.user
    const { statusCode, response } = await deleteClassroomUpdateByIdService(
      classId,
      updateId,
      userProfileId
    )

    res.status(statusCode).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteClassroomById = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { classId } = req.params

    const { statusCode, response } = await deleteClassroomByIdService(
      userProfileId,
      classId
    )
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const unEnrolClassroom = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { classId } = req.params
    console.log({ classId })
    const { statusCode, response } = await unEnrolClassroomService(
      userProfileId,
      classId
    )
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const deleteClassworkById = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { classworkId, classId } = req.params

    const { statusCode, response } = await deleteClassworkByIdService(
      classId,
      userProfileId,
      classworkId
    )

    res.status(statusCode).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const deleteStudent = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { classId, deleteStudentId } = req.params
    const { statusCode, response } = await deleteStudentService(classId, userProfileId, deleteStudentId)
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: `Internal server error` })
  }
}
