'use client'

import Image from 'next/image'
import React, { FormEvent, useEffect, useReducer, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useGetUser from '@/hooks/user/useGetUser'
import { Textarea } from '@/components/ui/textarea'
import { useGenerateLink } from '@/hooks/useGenerateLink'
import { Api } from '@/Constants'
import { SanityImageAssetDocument } from '@sanity/client'
import { useRouter } from 'next/navigation'
import { updateUserProfile } from '../../profile/ProfileAction'
import { Skeleton } from '@/components/ui/skeleton'

interface EditProfileState {
  username: string
  name: string
  userProfileImage: string
  bio: string
  privateAccount: string
  gender: string
}

const ACTIONS = {
  SET_USERNAME: 'SET_USERNAME',
  SET_NAME: 'SET_NAME',
  SET_USER_PROFILE_IMAGE: 'SET_USER_PROFILE_IMAGE',
  SET_BIO: 'SET_BIO',
  SET_PRIVATE_ACCOUNT: 'SET_PRIVATE_ACCOUNT',
  SET_GENDER: 'SET_GENDER',
}

type Action =
  | { type: typeof ACTIONS.SET_USERNAME; payload: string }
  | { type: typeof ACTIONS.SET_NAME; payload: string }
  | { type: typeof ACTIONS.SET_USER_PROFILE_IMAGE; payload: string }
  | { type: typeof ACTIONS.SET_BIO; payload: string }
  | { type: typeof ACTIONS.SET_PRIVATE_ACCOUNT; payload: string }
  | { type: typeof ACTIONS.SET_GENDER; payload: string }

const reducer = (state: EditProfileState, action: Action): EditProfileState => {
  switch (action.type) {
    case ACTIONS.SET_USERNAME:
      return { ...state, username: action.payload }
    case ACTIONS.SET_NAME:
      return { ...state, name: action.payload }
    case ACTIONS.SET_USER_PROFILE_IMAGE:
      return { ...state, userProfileImage: action.payload }
    case ACTIONS.SET_BIO:
      return { ...state, bio: action.payload }
    case ACTIONS.SET_PRIVATE_ACCOUNT:
      return { ...state, privateAccount: action.payload }
    case ACTIONS.SET_GENDER:
      return { ...state, gender: action.payload }
    default:
      return state
  }
}

const capitalizeFirstLetter = (word: string) => {
  const text = word.charAt(0).toUpperCase() + word.slice(1)
  return text
}

const EditProfile = () => {
  const initialState: EditProfileState = {
    username: '',
    name: '',
    userProfileImage: '',
    bio: '',
    privateAccount: '',
    gender: '',
  }

  // custom hooks
  const { generateUrl, getUrl } = useGenerateLink()
  const { loading, getUserProfile, errorMessage } = useGetUser()

  // Reducers
  const [state, dispatch] = useReducer(reducer, initialState)

  // Loading states
  const [uploadingImage, setUploadingImage] = useState<boolean>(false)
  const [submittingData, setSubmittingData] = useState<boolean>(false)

  // other states
  const [imageData, setImageData] = useState<SanityImageAssetDocument | undefined>(
    undefined
  )
  const router = useRouter()

  const handleImageUpload = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUploadingImage(true)
    try {
      const url = await generateUrl(e)
      setImageData(url)
      // @ts-ignore
      handleUserProfileImage(url?.url)
    } catch (err: any) {
      console.error(err.message)
    } finally {
      setUploadingImage(false)
    }
  }

  // handlers
  const handleUsername = (username: string) => {
    dispatch({ type: ACTIONS.SET_USERNAME, payload: username })
  }
  const handleUserProfileImage = (userProfileImage: string) => {
    dispatch({ type: ACTIONS.SET_USER_PROFILE_IMAGE, payload: userProfileImage })
  }
  const handleName = (name: string) => {
    dispatch({ type: ACTIONS.SET_NAME, payload: name })
  }
  const handleBio = (bio: string) => {
    dispatch({ type: ACTIONS.SET_BIO, payload: bio })
  }
  const handlePrivateAccount = (privateAccount: string) => {
    dispatch({ type: ACTIONS.SET_PRIVATE_ACCOUNT, payload: privateAccount })
  }
  const handleGender = (gender: string) => {
    dispatch({ type: ACTIONS.SET_GENDER, payload: gender })
  }

  const setUserDetails = async () => {
    const data = await getUserProfile()
    handleUsername(data.username)
    handleName(data.name)
    handleUserProfileImage(data.userProfileImage)
    handleBio(data.about)
    handlePrivateAccount(capitalizeFirstLetter(data.isPrivate.toString()))
    if (data.gender) {
      handleGender(capitalizeFirstLetter(data.gender.toString()))
    }
  }

  const submitNewProfile = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setSubmittingData(true)
      if (imageData) {
        const imageUrl = await getUrl(imageData)
        if (!imageUrl) {
          throw new Error('There was an error generating the image')
        }
        handleUserProfileImage(imageUrl)
      }

      const res = await fetch(`${Api}/users/edit-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)
      console.log(data.message)
      updateUserProfile()
      router.push('/profile')
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setSubmittingData(false)
    }
  }

  useEffect(() => {
    setUserDetails()
  }, [])

  return (
    <div className='w-full pb-8 flex justify-center '>
      <div className='lg:w-[80%] w-full h-full lg:px-0 px-[16px]'>
        <header className='text-[33px] mt-[36px] font-black sm:block hidden'>
          <h2>
            Edit your{' '}
            <span className='inline-block  font-black bg-gradient-to-r from-[#891DCC] to-[#C01DCC] bg-clip-text text-transparent'>
              &nbsp;Profile
            </span>
          </h2>
        </header>
        <section className='mt-[50px]'>
          <form
            onSubmit={submitNewProfile}
            className='flex flex-col justify-center pt-[36px]'
          >
            <div className='w-full sm:flex-row flex-col rounded-[15px] gap-[22px] sm:gap-0  sm:bg-neutral-900 bg-transparent sm:min-h-[108px] min-h-[230px]  flex  sm:justify-between  items-center justify-center px-[24px]'>
              <UserInfoCard
                imageUrl={state.userProfileImage}
                username={state.username}
                name={state.name}
                loading={loading}
              />
              <label className='text-white h-[34px] px-2 items-center bg-primary font-semibold rounded-[10px] flex gap-2'>
                <AiOutlineCloudUpload />
                <Input
                  type='file'
                  className='hidden h-0 w-0'
                  onChange={handleImageUpload}
                />
                {uploadingImage ? 'Uploading....' : 'Upload new picture'}
              </label>
            </div>

            {loading ? (
              <FormSkeleton />
            ) : (
              <div className='mt-[42px] flex gap-[15px] flex-col'>
                <label className='w-full mb-[4px]'>
                  <p className='mb-[2px] font-semibold'>Username</p>
                  <Input
                    type='text'
                    className='sm:rounded-full  rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'
                    value={state.username}
                    placeholder='Enter new username'
                    required
                    minLength={3}
                    maxLength={20}
                    onChange={e => handleUsername(e.target.value)}
                  />
                </label>
                <label className='w-full mb-[4px]'>
                  <p className='mb-[2px] font-semibold'>Name</p>
                  <Input
                    type='text'
                    className='sm:rounded-full  rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'
                    value={state.name}
                    onChange={e => handleName(e.target.value)}
                    minLength={3}
                    maxLength={20}
                    placeholder='Enter new name'
                    required
                  />
                </label>
                <label className='w-full mb-[4px]'>
                  <p className='mb-[2px] font-semibold'>Bio</p>
                  <Textarea
                    className='sm:rounded-xl rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'
                    placeholder='Enter your post description here'
                    onChange={e => handleBio(e.target.value)}
                    value={state.bio}
                    maxLength={200}
                    required
                  />
                </label>
                <label className='w-full mb-[4px]'>
                  <p className='mb-[2px] font-semibold'>Private account</p>
                  <Select onValueChange={handlePrivateAccount}>
                    <SelectTrigger className='sm:rounded-full  rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'>
                      <SelectValue placeholder='Private account?' />
                    </SelectTrigger>
                    <SelectContent className='bg-[#171717]'>
                      <SelectItem className='bg-[#171717]' value='True'>
                        True
                      </SelectItem>
                      <SelectItem className='bg-[#171717]' value='False'>
                        False
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </label>
                <label className='w-full mb-[4px]'>
                  <p className='mb-[2px] font-semibold'>Choose a gender</p>
                  <Select onValueChange={handleGender}>
                    <SelectTrigger className='sm:rounded-full  rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'>
                      <SelectValue placeholder='Choose a gender' />
                    </SelectTrigger>
                    <SelectContent className='bg-[#171717]'>
                      <SelectItem className='bg-[#171717]' value='Male'>
                        Male
                      </SelectItem>
                      <SelectItem className='bg-[#171717]' value='Female'>
                        Female
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </label>
              </div>
            )}

            <div className='flex gap-2 '>
              <Button
                className='text-white font-bold rounded-full h-[35px] mt-[15px]'
                disabled={submittingData}
                type='submit'
              >
                {submittingData ? 'Submitting...' : 'Submit'}
              </Button>
              <Button
                className='text-white font-bold bg-neutral-800 hover:bg-neutral-700 rounded-full h-[35px] mt-[15px]'
                onClick={() => {
                  router.push('/profile')
                }}
                type='button'
              >
                Cancel
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

const UserInfoCard = ({
  imageUrl,
  username,
  name,
  loading,
}: {
  imageUrl: string
  username: string
  name: string
  loading: boolean
}) => {
  if (loading) {
    return (
      <div className='flex items-center gap-[14px]'>
        <Skeleton className='aspect-square h-[66px] w-[66px] rounded-full object-cover' />
        <div className='flex gap-1 font-bold flex-col'>
          <Skeleton className='h-[16px] w-[80px]' />
          <Skeleton className='h-[13px] w-[60px]' />
        </div>
      </div>
    )
  }
  return (
    <div className='flex items-center flex-col sm:flex-row gap-[14px]'>
      <Image
        src={imageUrl}
        height={66}
        width={66}
        alt='user-image'
        className='aspect-square h-[66px] w-[66px] rounded-full object-cover'
        unoptimized
      />
      <div className='flex gap-1 font-bold flex-col sm:items-start items-center'>
        <p className='text-[16px]'>{name}</p>
        <p className='opacity-65 text-[13px]'>@{username}</p>
      </div>
    </div>
  )
}

export default EditProfile

function FormSkeleton() {
  return (
    <div className='mt-[42px] flex flex-col gap-6'>
      <div className='flex gap-2 flex-col'>
        <Skeleton className='h-4 w-[100px]' />
        <Skeleton className='rounded-[15px]  active:scale-[0.99] h-[20px]  w-full  p-4' />
      </div>
      <div className='flex gap-2 flex-col'>
        <Skeleton className='h-4 w-[100px]' />
        <Skeleton className='rounded-[15px]  active:scale-[0.99] h-[20px]  w-full  p-4' />
      </div>
      <div className='flex gap-2 flex-col'>
        <Skeleton className='h-4 w-[100px]' />
        <Skeleton className='rounded-[15px]  active:scale-[0.99] h-[65px]  w-full  p-4' />
      </div>
      <div className='flex gap-2 flex-col'>
        <Skeleton className='h-4 w-[100px]' />
        <Skeleton className='rounded-[15px]  active:scale-[0.99] h-[20px]  w-full  p-4' />
      </div>
      <div className='flex gap-2 flex-col'>
        <Skeleton className='h-4 w-[100px]' />
        <Skeleton className='rounded-[15px]  active:scale-[0.99] h-[20px]  w-full  p-4' />
      </div>
    </div>
  )
}
