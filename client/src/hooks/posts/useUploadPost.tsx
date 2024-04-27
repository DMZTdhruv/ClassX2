import { Api } from '@/Constants'
import { useState } from 'react'

interface UploadAttachments {
  _id: string
  originalFilename: string
  url: string
  extension: string
  _createdAt: string
}

interface IAttachment {
  attachments: UploadAttachments[]
  aspectRatio: string
  caption: string
  location: string
  category: string
}

const useUploadPost = () => {
  const [uploadLoading, setUploadLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const uploadPost = async (postData: IAttachment) => {
    setUploadLoading(true)
    try {
      const res = await fetch(`${Api}/post/create-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
    } catch (error: any) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      console.error(error.message)
    } finally {
      setUploadLoading(false)
    }
  }

  return { uploadLoading, errorMessage, uploadPost }
}

export default useUploadPost
