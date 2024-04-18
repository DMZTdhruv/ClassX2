import { Api } from '@/Constants'
import { updateClassroom } from '@/app/(root)/classroom/classroomActions'
import { useState } from 'react'

const useUnEnrolClassroom = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const unEnrolStudent = async (classId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${Api}/classroom/un-enrol/${classId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setSuccess(true)
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

  return { loading, error, success, unEnrolStudent }
}

export default useUnEnrolClassroom
