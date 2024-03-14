export const classroomUpdateValidator = (classId, description, attachments, user) => {
  if (!classId || !description || !user) {
    return true
  }
  return false
}
