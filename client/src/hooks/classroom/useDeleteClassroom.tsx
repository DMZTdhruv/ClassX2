import { Api } from '@/Constants'
import { updateClassroom } from '@/app/(root)/classroom/classroomActions'
import { useState } from 'react'

const useDeleteClassroom = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const deleteClassroom = async (classId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${Api}/classroom/delete-classroom/${classId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      // Update relevant state or dispatch actions if necessary
      updateClassroom()
    } catch (error: any) {
      console.error(error.message)
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, deleteClassroom }
}

export default useDeleteClassroom
