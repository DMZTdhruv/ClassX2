'use client'

import { AiOutlineCloudUpload } from 'react-icons/ai'
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useState,
} from 'react'
import { useGenerateLink } from '@/hooks/useGenerateLink'
import { SanityImageAssetDocument } from '@sanity/client'
import Image from 'next/image'
import { MdDeleteOutline } from 'react-icons/md'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import useCookieProvider from '@/hooks/useCookieProvider'

interface Post {
  title: string
  imageUrl: string | any
  caption: string
  location: string
  category: string
  postedBy: string | null | undefined
}

export default function index() {
  const router = useRouter()
  const cookie = useCookieProvider()

  const toast = useToast()
  const { generateUrl, getUrl } = useGenerateLink()

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
      if (!title || !demoUploadImage || !caption || !cookie?.userProfileId || !location) {
        throw new Error('Invalid details')
      }
      const imageUrl = await getUrl(demoUploadImage)
      const data = {
        title: title,
        imageUrl: imageUrl,
        caption: caption,
        location: location,
        category: category,
        postedBy: cookie?.userProfileId,
      }
      console.log(data)
      await submitDataToBackent(data)
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

  const submitDataToBackent = async (data: Post) => {
    const api = process.env.NEXT_PUBLIC_API
    try {
      const response = await fetch(`${api}/post/create-post`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookie?.cookie}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log(result)
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return (
    <div className='flex-col w-full flex p-[16px]'>
      <div className='flex flex-col items-center gap-3'>
        <p className='text-[18px] font-semibold text-center'>
          Enter post details
        </p>
        <div className={`w-full max-w-[548px] min-h-[300px] rounded-xl p-5 bg-[#171717]`}>
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
                <p>
                  {isUploadingImage ? 'Uploading image...' : 'upload image'}
                </p>
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
        {!demoUploadImage?.url && (
          <p className='text-center mt-3'>Upload images of type jpeg/png/gif</p>
        )}

        <form
          className='w-full max-w-[548px] flex gap-3 flex-col'
          onSubmit={handleFormSubmitEvent}
        >
          <label className='w-full mb-[4px]'>
            <p className='mb-2'>Title</p>
            <Input
              type='text'
              className='rounded-xl  bg-[#171717] border-none outline-none px-[16px]'
              placeholder='Enter your post title'
              onChange={handleTitle}
              value={title}
              required
            />
          </label>
          <label className='w-full mb-[4px]'>
            <p className='mb-2'>Caption</p>
            <Textarea
              className='rounded-xl bg-[#171717] border-none outline-none px-[16px]'
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
              className='rounded-xl  bg-[#171717] border-none outline-none px-[16px]'
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
              className='rounded-xl  bg-[#171717] border-none outline-none px-[16px]'
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
        {errorMessage && (
          <p className='text-center'>
            Error: <span className='text-red-500'>{errorMessage}</span>
          </p>
        )}
      </div>
    </div>
  )
}
