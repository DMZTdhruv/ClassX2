import express from 'express'
import { authenticateUserToken } from '../../middlewares/authenticateUser.js'
import {
  createClassroomClasswork,
  createClassroomController,
  createClassroomUpdate,
  deleteClassroomById,
  deleteClassroomUpdateById,
  deleteClassworkById,
  deleteStudent,
  getAllClassroom,
  getClassroom,
  getClassroomAdmins,
  getClassroomStudents,
  getClassroomTopics,
  getClassroomUpdate,
  getClassroomUpdates,
  getClassroomWork,
  getClassworkById,
  joinClassroomByAdminId,
  joinClassroomController,
  unEnrolClassroom,
} from '../../controllers/classroom/classroom.controller.js'
const router = express.Router()

router.get('/', authenticateUserToken, getAllClassroom)
router.get('/:classId', authenticateUserToken, getClassroom)
router.get('/updates/:classId', authenticateUserToken, getClassroomUpdates)
router.get('/:classId/update/:updateId', authenticateUserToken, getClassroomUpdate)
router.get('/:classId/topics', authenticateUserToken, getClassroomTopics)
router.get('/classwork/:classId/:topicId', authenticateUserToken, getClassroomWork)
router.get('/:classId/classwork/:classworkId', authenticateUserToken, getClassworkById)

router.get('/:classId/people/admins', authenticateUserToken, getClassroomAdmins)
router.get('/:classId/people/students', authenticateUserToken, getClassroomStudents)

router.post('/create-classroom', authenticateUserToken, createClassroomController)
router.post('/create-update', authenticateUserToken, createClassroomUpdate)
router.post('/join-classroom', authenticateUserToken, joinClassroomController)
router.post('/join-classroom/admin', authenticateUserToken, joinClassroomByAdminId)
router.post('/create-classwork', authenticateUserToken, createClassroomClasswork)
router.post('/un-enrol/:classId', authenticateUserToken, unEnrolClassroom)

router.delete(
  '/:classId/delete-update/:updateId',
  authenticateUserToken,
  deleteClassroomUpdateById
)

router.delete('/delete-classroom/:classId', authenticateUserToken, deleteClassroomById)
router.delete(
  '/:classId/delete-classwork/:classworkId',
  authenticateUserToken,
  deleteClassworkById
)
router.delete(
  '/:classId/delete-student/:deleteStudentId',
  authenticateUserToken,
  deleteStudent
)

export default router
