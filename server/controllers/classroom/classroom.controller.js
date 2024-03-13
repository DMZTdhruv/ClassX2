import {
  createClassroomService,
  getAllClassroomsService,
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
