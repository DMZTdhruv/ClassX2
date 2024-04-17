import { Api } from '@/Constants'
import {
  updateClassroom,
  updateClassroomUpdates,
} from '@/app/(root)/classroom/classroomActions'
import { useState } from 'react'

const useDeleteUpdate = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const deleteUpdate = async (classId: string, updateId: string) => {
    setLoading(true)
    try {
      console.log(updateId)
      const res = await fetch(`${Api}/classroom/${classId}/delete-update/${updateId}`, {
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
      console.log(data)
      updateClassroomUpdates()
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

  return { loading, error, deleteUpdate }
}

export default useDeleteUpdate
