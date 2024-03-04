import { Api } from '@/Constants'
import { SanityImageAssetDocument } from '@sanity/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useCreateUserProfile = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const createUserProfile = async (
    name: string,
    username: string,
    bio: string,
    userProfileImageDemoLink: SanityImageAssetDocument | undefined,
    enrollmentNo: string,
    userBranch: string,
    division: string,
    userSemester: number | undefined,
    isPrivate: boolean,
    getUrl: (file: any) => Promise<any>
  ) => {
    setLoading(true)
    try {
      validateUserProfileData(
        name,
        username,
        userProfileImageDemoLink,
        enrollmentNo,
        userBranch,
        division,
        userSemester,
        isPrivate
      )
      const imageUrl = await getUrl(userProfileImageDemoLink)
      if (!imageUrl) {
        throw new Error('There was an error generating the image')
      }

      const userDetails = {
        userID: JSON.parse(localStorage.getItem('classX_user') || '')?.userID,
        name: name,
        username: username,
        about: bio,
        userProfileImage: imageUrl,
        enrollmentNumber: enrollmentNo,
        branchName: userBranch,
        semesterNumber: userSemester,
        divisionName: division,
        isPrivate: isPrivate,
      }

      const res = await fetch(`${Api}/users/create-user-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setMessage(data.message)
      setTimeout(() => {
        setMessage('')
      }, 5000)

      localStorage.setItem('classX_user', JSON.stringify(data.userProfile))
      router.push('/')
    } catch (error: any) {
      console.error(error.message)
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  return { loading, message, errorMessage, createUserProfile }
}

export default useCreateUserProfile

const validateUserProfileData = (
  name: string,
  username: string,
  userProfileImageDemoLink: SanityImageAssetDocument | undefined,
  enrollmentNo: string,
  userBranch: string,
  division: string,
  userSemester: number | undefined,
  isPrivate: boolean
) => {
  if (
    !name ||
    !username ||
    userProfileImageDemoLink === undefined ||
    !enrollmentNo ||
    !userBranch ||
    !division ||
    userSemester === undefined ||
    isPrivate === undefined
  ) {
    throw new Error('Incomplete details')
  }
}
