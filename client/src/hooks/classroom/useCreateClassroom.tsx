import { Api } from '@/Constants'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateClassroom } from '@/app/(root)/classroom/classroomActions'

interface ClassroomState {
  className: string
  branch: string
  division: string
  semester: string
}

const useCreateClassroom = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const createClassroom = async (classroomData: ClassroomState) => {
    
    try {
      setLoading(true)
      const res = await fetch(`${Api}/classroom/create-classroom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classroomData),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setMessage(data.message)
      updateClassroom()
      router.push('/classroom')
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    message,
    createClassroom,
  }
}

export default useCreateClassroom
