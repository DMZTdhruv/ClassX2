import { Api } from '@/Constants'
import React, { useState } from 'react'

const useGetTopics = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [topics, setTopics] = useState<string[]>([])
  const getTopics = async (classId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${Api}/classroom/${classId}/topics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await res.json()
      setTopics(data.data)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getTopics, topics }
}

export default useGetTopics
