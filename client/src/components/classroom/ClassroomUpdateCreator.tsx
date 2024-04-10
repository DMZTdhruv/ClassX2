'use client'

import { useAuthContext } from '@/context/AuthContext'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import CustomTextArea from '../shared/ChatComponents/CustomTextArea'
import useCreateUpdate from '@/hooks/classroom/useCreateUpdate'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import client from '../../../client'
import { SanityImageAssetDocument } from '@sanity/client'
import { useGenerateLink } from '@/hooks/useGenerateLink'

interface IClassroomUpdate {
  classId: string
  title?: string
  description: string
  attachments?: string[]
}

const ClassroomUpdateCreator = ({
  adminIds,
  classId,
}: {
  adminIds: string[]
  classId: string
}) => {
  const { authUser } = useAuthContext()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [attachments, setAttachments] = useState<string[]>([])
  const { loading, createUpdate, error, message } = useCreateUpdate()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const { getUrl } = useGenerateLink()

  const [images, setImages] = useState<any[]>([])
  const [title, setTitle] = useState<string>('')
  const [tempImageUrls, setTempImageUrls] = useState<SanityImageAssetDocument[]>([])
  const [updateImages, setUpdateImages] = useState<string[]>([])
  const [blobUrls, setBlobUrls] = useState<any[]>([])

  const [gettingTempImages, setGettingTempImages] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)

  useEffect(() => {
    if (authUser?.userProfileId) {
      setIsAdmin(adminIds.includes(authUser.userProfileId))
    } else {
      setIsAdmin(false)
    }
  }, [authUser])

  const adjustTextareaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [description])

  const createUpdateForClassroom = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setUploading(true)
      if (description.trim() === '') {
        throw new Error('A title is required')
      }

      await uploadingImages()

      if (updateImages.length !== images.length) {
        console.log(updateImages.length, images.length)
        throw new Error('Wait your images are uploading to database...')
      }

      const updateData = {
        classId,
        title: title,
        description: description,
        attachments: updateImages,
      }

      await createUpdate(updateData)
      setTitle('')
      setDescription('')
      setImages([])
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setUploading(false)
    }
  }

  const uploadImage = async (e: any) => {
    try {
      if (e.target.files) {
        setImages(prev => [...prev, e.target.files[0]])
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const getTempUrls = async () => {
    try {
      setGettingTempImages(true)
      const urls = await Promise.all(
        images.map(async image => {
          const imageData = await client.assets.upload('image', image)
          return imageData
        })
      )

      console.log(urls)
      setTempImageUrls(urls)
      console.log(urls)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setGettingTempImages(false)
    }
  }

  const uploadingImages = async () => {
    setUploading(true)
    try {
      const imageUrls = await Promise.all(
        tempImageUrls.map(async file => {
          return await getUrl(file)
        })
      )
      console.log(imageUrls)
      setUpdateImages(imageUrls)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    const getImages = async () => {
      await getTempUrls()
    }
    getImages()
    const urls = images.map(image => URL.createObjectURL(image))
    setBlobUrls(urls)
  }, [images])

  return (
    <section>
      {openModal ? (
        <form
          className='bg-neutral-900 relative flex flex-col items-end  md:p-[22px] p-[16px] rounded-[20px]'
          onSubmit={createUpdateForClassroom}
        >
          <div className='flex flex-col gap-2 w-full'>
            <label className='w-full'>
              <span className='font-semibold'>Title</span>
              <Input
                type='text'
                className='focus-visible:ring-0 bg-transparent border-none outline-none '
                placeholder='Enter the title'
                onChange={e => setTitle(e.target.value)}
                value={title}
                required
              />
            </label>
            <label className='w-full'>
              <span className='font-semibold'>Description</span>
              <textarea
                ref={textAreaRef}
                value={description}
                placeholder={'Write description...'}
                className='bg-[#171717] mt-2 w-full md:pr-[40px] pr-[30px] px-[16px] outline-none focus-visible:ring-0 resize-none border-none rounded-lg h-auto caret-violet-300'
                required
                onChange={e => setDescription(e.target.value)}
              />
            </label>
            <label
              className='flex w-fit flex-col justify-start items-start'
              htmlFor='uploadImage'
            >
              <span>Upload:</span>
              <span className=' text-white font-semibold bg-primary px-4 mt-1 py-1 rounded-full'>
                Upload-image
              </span>
              <input
                type='file'
                onChange={uploadImage}
                id='uploadImage'
                className='h-0 w-0'
              />
            </label>
            {images.length > 0 && (
              <Carousel className='max-w-[300px] rounded-md mt-3 max-h-[300px]'>
                <CarouselContent className='max-w-[300px]  max-h-[300px] rounded-md'>
                  {blobUrls.map(image => {
                    return (
                      <CarouselItem className='rounded-md' key={image}>
                        <Image
                          src={image}
                          alt='image'
                          width={150}
                          height={150}
                          className='aspect-square w-full h-full object-cover rounded-md'
                        />
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <p className='mt-2 font-semibold'>Total attachments: {images.length}</p>
                <span className='mt-1 text-[13px] text-neutral-600'>
                  Drag images to move left and right
                </span>
              </Carousel>
            )}
          </div>

          <div className='flex items-center gap-3'>
            {gettingTempImages && (
              <span className='animate-pulse text-neutral-600'>
                Uploading images...
              </span>
            )}
            <button
              type='submit'
              disabled={loading || gettingTempImages || uploading}
              className={` ${
                loading && 'animate-pulse'
              }text-white px-4 py-2 group rounded-full bg-primary font-bold `}
            >
              <span className='inline-block active:scale-90 group-active:scale-90'>
                {uploading ? 'Posting...' : 'Post'}
              </span>
            </button>
            <button
              type='button'
              onClick={() => setOpenModal(prev => !prev)}
              className={` ${
                loading && 'animate-pulse'
              }text-white px-4 py-2 rounded-full group hover:bg-neutral-800/60 bg-neutral-800 font-bold `}
            >
              <span className='inline-block group-active:scale-90'>Cancel</span>
            </button>
          </div>
        </form>
      ) : (
        <div
          className='flex group items-center md:p-[22px] p-[16px] bg-neutral-900 rounded-[20px]'
          onClick={() => setOpenModal(prev => !prev)}
        >
          <div className='flex items-center gap-[10px]'>
            <Image
              src={authUser?.userProfileImage || ''}
              alt='User profile image'
              height={48}
              width={48}
              className='aspect-square object-cover rounded-full'
              unoptimized
            />
            <div className='flex items-start flex-col group-hover:underline '>
              <p>Any updates click here to create!</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ClassroomUpdateCreator
