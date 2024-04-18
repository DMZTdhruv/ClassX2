import { Api } from '@/Constants'
import { useState } from 'react'
import { updateClassroomClassworkData } from '@/app/(root)/classroom/classroomActions'

const useDeleteClasswork = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const deleteClasswork = async (classId: string, classworkId: string) => {
    setLoading(true)
    try {
      const res = await fetch(
        `${Api}/classroom/${classId}/delete-classwork/${classworkId}`,
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
      updateClassroomClassworkData()
      setSuccess(true)
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

  return { loading, error, success, deleteClasswork }
}

export default useDeleteClasswork
