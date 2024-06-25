import { Api } from '@/Constants'
import { updateClassroom } from '@/app/(root)/classroom/classroomActions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useJoinClassroomAsAdmin = () => {
  const [adminJoiningLoading, setAdminJoiningLoading] = useState<boolean>(false)
  const [adminJoiningError, setAdminJoiningError] = useState<string>('')

  const router = useRouter()
  const joinClassroomByAdminId = async (adminClassroomId: string) => {
    setAdminJoiningLoading(true)
    try {
      const res = await fetch(`${Api}/classroom//join-classroom/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classroomAdminJoinId: adminClassroomId }),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      updateClassroom()
      router.replace('/classroom')
    } catch (error: any) {
      setAdminJoiningError(error.message)
      setTimeout(() => {
        setAdminJoiningError('')
      }, 5000)
      console.error(error.message)
    } finally {
      setAdminJoiningLoading(false)
    }
  }

  return { adminJoiningLoading, adminJoiningError, joinClassroomByAdminId }
}

export default useJoinClassroomAsAdmin
