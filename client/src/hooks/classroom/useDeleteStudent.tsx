import { Api } from '@/Constants'
import { useState } from 'react'
import { updateClassroomStudents } from '@/app/(root)/classroom/classroomActions'

const useDeleteStudent = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const deleteStudentById = async (classId: string, studentId: string) => {
    setLoading(true)
    try {
      const res = await fetch(
        `${Api}/classroom/${classId}/delete-student/${studentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      updateClassroomStudents()
    } catch (error: any) {
      console.error(error.message)
      setError(error.message)
      setLoading(false)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  return { loading, error, deleteStudentById }
}

export default useDeleteStudent
