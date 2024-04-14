import express from 'express'
import { authenticateUserToken } from '../../middlewares/authenticateUser.js'
import {
  createClassroomController,
  createClassroomUpdate,
  getAllClassroom,
  getClassroom,
  getClassroomUpdate,
  getClassroomUpdates,
  joinClassroomController,
} from '../../controllers/classroom/classroom.controller.js'
const router = express.Router()

router.get('/', authenticateUserToken, getAllClassroom)
router.get('/:classId', authenticateUserToken, getClassroom)
router.get('/updates/:classId', authenticateUserToken, getClassroomUpdates)
router.get('/:classId/update/:updateId', authenticateUserToken, getClassroomUpdate)

router.post('/create-classroom', authenticateUserToken, createClassroomController)
router.post('/create-update', authenticateUserToken, createClassroomUpdate)
router.post('/join-classroom', authenticateUserToken, joinClassroomController)

export default router
