export const classroomUpdateValidator = (classId, title, description, attachments, user) => {
  if (!classId || !description || !user) {
    return true
  }
  return false
}
