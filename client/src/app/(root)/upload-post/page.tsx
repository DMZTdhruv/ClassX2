'use client'

import { AiOutlineCloudUpload } from 'react-icons/ai'
import React, { FormEvent, useEffect, useState } from 'react'
import { useUserProvider } from '@/hooks/useUserProvider'
import { useGenerateLink } from '@/hooks/useGenerateLink'
import { SanityImageAssetDocument } from '@sanity/client'
import Image from 'next/image'
import { MdDeleteOutline } from 'react-icons/md'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function index() {
  const toast = useToast()
  const { generateUrl, getUrl } = useGenerateLink()

  // states
  const [demoUploadImage, setDemoUploadImage] = useState<
    SanityImageAssetDocument | undefined
  >(undefined)

  const url =
    'https://pbs.twimg.com/media/GF2vpjyXkAAorQ5?format=jpg&name=4096x4096'

  //loading states
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false)
  const [isPosting, setIsPosting] = useState<boolean>(false)

  //error states
  const [errorMessage, setErrorMessage] = useState<string>('')

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
      }, 2000)
    } finally {
      setIsUploadingImage(false)
    }
  }

  return (
    <div className='flex-col w-full flex p-[16px]'>
      <div className='flex flex-col items-center gap-3'>
        <p className='text-[18px] font-semibold text-center'>
          Enter post details
        </p>
        <div className='w-full max-w-[548px]  h-auto rounded-xl p-5 bg-[#171717]'>
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

        <form className='w-full max-w-[548px] flex gap-3 flex-col'>
          <label className='w-full mb-[4px]'>
            <p className='mb-2'>Title</p>
            <Input
              type='text'
              className='rounded-xl  bg-[#171717] border-none outline-none px-[16px]'
              placeholder='Enter your post title'
              onChange={() => {}}
              required
            />
          </label>
          <label className='w-full mb-[4px]'>
            <p className='mb-2'>Caption</p>
            <Textarea
              className='rounded-xl bg-[#171717] border-none outline-none px-[16px]'
              placeholder='Enter your post description here'
              onChange={() => {}}
              required
            />
          </label>
          <label className='w-full mb-[4px]'>
            <p className='mb-2'>Location</p>
            <Input
              type='text'
              className='rounded-xl  bg-[#171717] border-none outline-none px-[16px]'
              placeholder='Enter the location'
              onChange={() => {}}
              required
            />
          </label>
          <label className='w-full mb-[4px]'>
            <p className='mb-2'>Category</p>
            <Input
              type='text'
              className='rounded-xl  bg-[#171717] border-none outline-none px-[16px]'
              placeholder='Enter the category'
              onChange={() => {}}
              required
            />
          </label>
          <Button type='button' className='text-white' disabled={isPosting}>
            {isPosting ? 'Posting...' : 'Post'}
          </Button>
        </form>
      </div>
    </div>
  )
}
