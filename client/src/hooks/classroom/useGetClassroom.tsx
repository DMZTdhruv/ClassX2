import { Api } from '@/Constants'
import { useState } from 'react'

const useGetClassroom = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [classrooms, setClassrooms] = useState<any[]>([])
  const getClassrooms = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${Api}/classroom`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(`${data.error}`)
      }

      setClassrooms(data.data)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    classrooms,
    getClassrooms,
  }
}

export default useGetClassroom
