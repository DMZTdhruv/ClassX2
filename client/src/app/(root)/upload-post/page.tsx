'use client'

import { AiOutlineCloudUpload } from 'react-icons/ai'
import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import { useGenerateLink } from '@/hooks/useGenerateLink'
import { SanityImageAssetDocument } from '@sanity/client'
import Image from 'next/image'
import { MdDeleteOutline } from 'react-icons/md'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { updateFeed } from '../serverActions'
import { useAuthContext } from '@/context/AuthContext'
import { usePostContext } from '@/context/PostContext'

interface Post {
  title: string
  imageUrl: string | any
  caption: string
  location: string
  category: string
  postedBy: string | null | undefined
}

export default function UploadPost() {
  const router = useRouter()
  //@ts-ignore
  const { authUser } = useAuthContext()
  const { generateUrl, getUrl } = useGenerateLink()
  const { setExplorePost, setUserPost, setFeedPost } = usePostContext()

  // states
  const [demoUploadImage, setDemoUploadImage] = useState<
    SanityImageAssetDocument | undefined
  >(undefined)
  const [title, setTitle] = useState<string>('')
  const [caption, setCaption] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  //loading states
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false)
  const [isPosting, setIsPosting] = useState<boolean>(false)

  //error states
  const [errorMessage, setErrorMessage] = useState<string>('')

  //handlers
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleCaption: ChangeEventHandler<HTMLTextAreaElement> = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCaption(e.target.value)
  }

  const handleLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
  }

  const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  const handleUploadFile = async (e: FormEvent<HTMLInputElement>) => {
    setIsUploadingImage(true)
    try {
      const url = await generateUrl(e)
      setDemoUploadImage(url)
    } catch (err: any) {
      console.log(err.message)
      setErrorMessage(err.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleFormSubmitEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPosting(true)
    try {
      if (!title || !demoUploadImage || !caption || !location) {
        throw new Error('Invalid details')
      }
      const imageUrl = await getUrl(demoUploadImage)
      const data = {
        title: title,
        imageUrl: imageUrl,
        caption: caption,
        location: location,
        category: category,
        postedBy: authUser?.userProfileId,
      }
      updateFeed()
      setExplorePost([])
      setFeedPost([])
      setUserPost([])
      await submitDataToBackend(data)
      router.push('/')
    } catch (err: any) {
      console.log(err)
      setErrorMessage(err.message)
      setTimeout(() => {
        setErrorMessage(err.message)
      }, 5000)
    } finally {
      setIsPosting(false)
    }
  }

  const submitDataToBackend = async (data: Post) => {
    const api = process.env.NEXT_PUBLIC_API
    try {
      const response = await fetch(`${api}/post/create-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log(result)
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return (
    <div className='flex-col w-full  flex lg:justify-center pb-[100px] sm:px-[16px] lg:h-screen p-[16px] mt-[80px] sm:mt-[0px]'>
      <div className='flex flex-col items-center gap-3'>
        <header className='sm:text-[33px] mt-[36px] font-black sm:block hidden'>
          <h2 className='sm:block hidden pb-[30px]'>
            Upload{' '}
            <span className='inline-block  font-black bg-gradient-to-r from-[#891DCC] to-[#C01DCC] bg-clip-text text-transparent'>
              &nbsp;Post
            </span>
          </h2>
          <p className='sm:hidden'>Upload post</p>
        </header>
        <div className='w-full flex lg:flex-row flex-col gap-5 lg:justify-center items-center h-full '>
          <div
            className={`w-full max-w-[548px] min-h-[300px] rounded-xl p-5 bg-[#171717]`}
          >
            {demoUploadImage?.url ? (
              <div className='w-full relative'>
                <Image
                  src={demoUploadImage?.url}
                  width={0}
                  height={0}
                  style={{ height: 'auto', width: '100%' }}
                  alt='uploaded-image'
                  unoptimized
                  className='rounded-md'
                />
                <button
                  onClick={() => setDemoUploadImage(undefined)}
                  className='bg-neutral-900 rounded-md p-1 absolute opacity-70 hover:opacity-100 transition-opacity right-0 bottom-0 '
                >
                  <MdDeleteOutline size={25} />
                </button>
              </div>
            ) : (
              <label
                className={`flex min-h-[400px] w-full rounded-lg  border-2  border-dashed items-center justify-center ${
                  isUploadingImage && 'animate-pulse'
                } `}
              >
                <div className='flex items-center flex-col gap-2  justify-center'>
                  <AiOutlineCloudUpload />
                  <p>{isUploadingImage ? 'Uploading image...' : 'upload image'}</p>
                  {errorMessage && (
                    <p className='text-center'>
                      Error: <span className='text-red-500'>{errorMessage}</span>
                    </p>
                  )}
                </div>
                <input
                  type='file'
                  disabled={isUploadingImage}
                  className='h-0 w-0 hidden'
                  onChange={handleUploadFile}
                />
              </label>
            )}
          </div>

          <form
            className='w-full max-w-[548px] flex gap-3 flex-col'
            onSubmit={handleFormSubmitEvent}
          >
            {!demoUploadImage?.url && (
              <p className='text-center mt-3'>Upload images of type jpeg/png/gif</p>
            )}
            <label className='w-full mb-[4px]'>
              <p className='mb-2'>Title</p>
              <Input
                type='text'
                className='sm:rounded-xl rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'
                placeholder='Enter your post title'
                onChange={handleTitle}
                value={title}
                required
              />
            </label>
            <label className='w-full mb-[4px]'>
              <p className='mb-2'>Caption</p>
              <Textarea
                className='sm:rounded-xl rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'
                placeholder='Enter your post description here'
                onChange={handleCaption}
                value={caption}
                required
              />
            </label>
            <label className='w-full mb-[4px]'>
              <p className='mb-2'>Location</p>
              <Input
                type='text'
                className='sm:rounded-xl rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'
                placeholder='Enter the location'
                onChange={handleLocation}
                value={location}
                required
              />
            </label>
            <label className='w-full mb-[4px]'>
              <p className='mb-2'>Category</p>
              <Input
                type='text'
                className='sm:rounded-xl rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'
                placeholder='Enter the category'
                onChange={handleCategory}
                value={category}
                required
              />
            </label>
            <Button type='submit' className='text-white' disabled={isPosting}>
              {isPosting ? 'Posting...' : 'Post'}
            </Button>
          </form>
        </div>
        {errorMessage && (
          <p className='text-center'>
            Error: <span className='text-red-500'>{errorMessage}</span>
          </p>
        )}
      </div>
    </div>
  )
}
