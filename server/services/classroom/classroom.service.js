import ClassroomRepository from '../../repositories/classroom.repository.js'

const classroomRepo = new ClassroomRepository()
export const createClassroomService = async (
  className,
  branch,
  division,
  semester,
  user
) => {
  try {
    await classroomRepo.createClassroom(className, branch, division, semester, user)
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
