import { Api } from '@/Constants'
import { updateClassroomUpdates } from '@/app/(root)/classroom/classroomActions'
import { useState } from 'react'

interface IClassroomUpdate {
  classId: string
  description: string
  attachments?: string[]
}

const useCreateUpdate = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const createUpdate = async (updateObj: IClassroomUpdate) => {
    setLoading(true)
    try {
      const res = await fetch(`${Api}/classroom/create-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateObj),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setMessage(data.message)
      updateClassroomUpdates()
      console.log(data)
    } catch (error: any) {
      console.error(error.message)
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  return { loading, createUpdate, error, message }
}

export default useCreateUpdate
