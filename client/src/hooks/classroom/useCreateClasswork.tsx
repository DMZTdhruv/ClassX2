import { Api } from '@/Constants'
import { updateClassroomUpdates } from '@/app/(root)/classroom/classroomActions'
import { useState } from 'react'

interface IClassroomWork {
  classId: string
  title: string
  description: string
  topic: string
  attachments: string[]
}

const useCreateClasswork = () => {
  const [uploadingFile, setUploadingFile] = useState<boolean>(false)
  const [uploadingFileError, setUploadingFileError] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const createClasswork = async (classworkObj: IClassroomWork) => {
    setUploadingFile(true)
    try {
      const res = await fetch(`${Api}/classroom/create-classwork`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classworkObj),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setMessage(data.message)
      updateClassroomUpdates()
    } catch (error: any) {
      console.error(error.message)
      setUploadingFileError(error.message)
      setTimeout(() => {
        setUploadingFileError('')
      }, 3000)
    } finally {
      setUploadingFile(false)
    }
  }

  return { uploadingFile, createClasswork, uploadingFileError, message }
}

export default useCreateClasswork
