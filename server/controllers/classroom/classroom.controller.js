import {
  createClassroomService,
  createClassroomUpdatesService,
  getAllClassroomsService,
  getClassroomService,
  getClassroomUpdateService,
} from '../../services/classroom/classroom.service.js'

export const createClassroomController = async (req, res) => {
  try {
    const user = req.user
    console.log(req.body)
    const { className, branch, division, semester } = req.body
    const { statusCode, response } = await createClassroomService(
      className,
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
    const { statusCode, response } = await getClassroomService(classId)
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in getClassroomController ${error.message}`)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const createClassroomUpdate = async (req, res) => {
  try {
    const user = req.user
    const { classId, description, attachments } = req.body

    const { statusCode, response } = await createClassroomUpdatesService(
      classId,
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
