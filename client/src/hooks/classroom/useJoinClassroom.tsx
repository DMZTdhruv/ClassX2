import { Api } from '@/Constants'
import { updateClassroom } from '@/app/(root)/classroom/classroomActions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useJoinClassroom = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const router = useRouter()

  const joinClassroom = async (classroomJoinId: string) => {
    try {
      setLoading(true)
      const res = await fetch(`${Api}/classroom/join-classroom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classroomJoinId }),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setMessage(data.message)
      updateClassroom()
      router.push('/classroom')
      return data.data
    } catch (error: any) {
      console.error(`Error joining classroom: ${error.message}`)
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  return { loading, joinClassroom, error, message }
}

export default useJoinClassroom
