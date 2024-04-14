import { Api } from '@/Constants'
import { errorMessageFunc } from '@/utils/errorMessageFunc'
import React, { useState } from 'react'

interface IUpdate {
  title: string
  description: string
  postedBy: {
    username: string
    userProfileImage: string
  }
  attachments: string[]
  createdAt: Date
}

const useGetUpdate = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [updateData, setUpdateData] = useState<IUpdate>()
  const [error, setError] = useState<string>('')

  const getClassroomUpdate = async (classId: string, updateId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${Api}/classroom/${classId}/update/${updateId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await res.json()
      console.log(data.data.createdAt)
      if (data.error) {
        throw new Error(data.error)
      }

      setUpdateData(data.data)
    } catch (error: any) {
      console.error(error.message)
      errorMessageFunc(error.message, setError)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, updateData, getClassroomUpdate }
}

export default useGetUpdate
