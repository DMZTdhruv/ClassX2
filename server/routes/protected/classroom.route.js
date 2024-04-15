import express from 'express'
import { authenticateUserToken } from '../../middlewares/authenticateUser.js'
import {
  createClassroomClasswork,
  createClassroomController,
  createClassroomUpdate,
  getAllClassroom,
  getClassroom,
  getClassroomTopics,
  getClassroomUpdate,
  getClassroomUpdates,
  getClassroomWork,
  getClassworkById,
  joinClassroomController,
} from '../../controllers/classroom/classroom.controller.js'
const router = express.Router()

router.get('/', authenticateUserToken, getAllClassroom)
router.get('/:classId', authenticateUserToken, getClassroom)
router.get('/updates/:classId', authenticateUserToken, getClassroomUpdates)
router.get('/:classId/update/:updateId', authenticateUserToken, getClassroomUpdate)
router.get('/:classId/topics', authenticateUserToken, getClassroomTopics)
router.get('/classwork/:classId/:topicId', authenticateUserToken, getClassroomWork)
router.get('/:classId/classwork/:classworkId', authenticateUserToken, getClassworkById)

router.post('/create-classroom', authenticateUserToken, createClassroomController)
router.post('/create-update', authenticateUserToken, createClassroomUpdate)
router.post('/join-classroom', authenticateUserToken, joinClassroomController)
router.post('/create-classwork', authenticateUserToken, createClassroomClasswork)

export default router
