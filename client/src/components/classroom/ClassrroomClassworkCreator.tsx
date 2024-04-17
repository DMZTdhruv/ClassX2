'use client'

import { useAuthContext } from '@/context/AuthContext'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import useGenerateFileLink from '@/hooks/useGenerateFileLink'
import { SanityAssetDocument, SanityImageAssetDocument } from '@sanity/client'
import { BsFiletypePdf } from 'react-icons/bs'
import { BsFiletypePpt } from 'react-icons/bs'
import { BsFiletypeDocx } from 'react-icons/bs'
import Link from 'next/link'
import { Textarea } from '../ui/textarea'
import { RxCross2 } from 'react-icons/rx'
import { IoWarningOutline } from 'react-icons/io5'
import ClassroomHeader from './ClassroomHeader'
import useCreateClassroom from '@/hooks/classroom/useCreateClassroom'
import useCreateClasswork from '@/hooks/classroom/useCreateClasswork'
import {
  updateClassroom,
  updateClassroomUpdates,
} from '@/app/(root)/classroom/classroomActions'
import useGetTopics from '@/hooks/classroom/useGetTopics'
import { Skeleton } from '../ui/skeleton'

interface IClassroomCreator {
  classId: string
  title?: string
  description: string
  attachments?: string[]
}

interface ErrorMessages {
  fileUploadError: string
  incompleteDetails: string
  uploadingImagesError: string
  uploadError: string
  totalImagesError: string
}

/*
{
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: true,
    },
    attachments: [
      {
        type: String,
      },
    ],
    topic: [
      {
        type: String,
        required: true,
      },
    ],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
*/

const ClassroomClassworkCreator = ({
  adminIds,
  classId,
}: {
  adminIds: string[]
  classId: string
}) => {
  const { authUser } = useAuthContext()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { generateTempFileUrl, getFile, sanityError } = useGenerateFileLink()
  const { uploadingFile, uploadingFileError, message, createClasswork } =
    useCreateClasswork()

  const { getTopics, loading, topics } = useGetTopics()

  useEffect(() => {
    getTopics(classId)
  }, [])

  // States
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [existingTopics, setExistingTopics] = useState<string[]>(topics)
  const [posted, setPosted] = useState<boolean>(false)

  // error states
  const [classWorkError, setClassWorkError] = useState<string>('')

  // loading states
  const [generatingTempUrl, setGeneratingTempUrl] = useState<boolean>(false)
  const [gettingUrl, setGettingUrl] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)

  // classwork body
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [attachments, setAttachMents] = useState<SanityAssetDocument[]>([])
  const [attachmentsUrl, setAttachmentsoUrl] = useState<string[]>([])
  const [topic, setTopic] = useState<string>('')

  // loading states
  const [uploadingImage, setUploadingImage] = useState<boolean>(false)

  // Error states
  const [error, setError] = useState<string>('')

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

  const handleTopicChange = (value: string) => {
    setTopic(value)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setGeneratingTempUrl(true)
      const url = await generateTempFileUrl(e)
      url && setAttachMents(prev => [url, ...prev])
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setGeneratingTempUrl(false)
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    clearClasswork()
  }

  const clearClasswork = () => {
    setTitle('')
    setDescription('')
    setAttachMents([])
    setTopic('')
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [description])

  const getFileUrlsFromSanity = async () => {
    try {
      const files = await Promise.all(
        attachments.map(async attachment => await getFile(attachment))
      )

      return files
    } catch (error: any) {
      console.error(error.message)
      setClassWorkError(error.message)
    } finally {
      setTimeout(() => {
        setClassWorkError('')
      }, 5000)
    }
  }

  interface IClassroomWork {
    classId: string
    title: string
    description: string
    topic: string
    attachments: string[]
  }

  const handleClassworkSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setUploading(true)
    try {
      if (
        description.trim() === '' ||
        title.trim() === '' ||
        topic.trim() === '' ||
        attachments.length === 0
      ) {
        throw new Error('Incomplete details')
      }

      const classworkObj: IClassroomWork = {
        classId: classId,
        title: title,
        description: description,
        topic: topic,
        // @ts-ignore
        attachments: await getFileUrlsFromSanity(),
      }

      if (classworkObj.attachments.length === attachments.length) {
        await createClasswork(classworkObj)
      } else {
        throw new Error(`Post again!`)
      }

      setPosted(true)
      setTimeout(() => {
        setPosted(false)
      }, 5000)
      setOpenModal(false)
      clearClasswork()
    } catch (error: any) {
      console.error(error.message)
      setClassWorkError(error.message)
      setTimeout(() => {
        setClassWorkError('')
      }, 5000)
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className='p-[16px] mt-3'>
      {posted && (
        <div className='fixed animate-in fade-in-0 top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%]'>
          <span className='animate-in fade-in-0 border py-1 px-4 rounded-full bg-neutral-900 border-neutral-800'>
            posted
          </span>
        </div>
      )}
      {openModal ? (
        <form
          className='bg-neutral-900/40 md:border-neutral-800 md:border relative flex flex-col items-end  md:p-[22px] p-[16px] rounded-[20px]'
          onSubmit={handleClassworkSubmit}
        >
          <div className='flex flex-col gap-4 w-full'>
            <label className='w-full'>
              <span className='font-semibold'>Title</span>
              <Input
                type='text'
                className='focus-visible:ring-0 bg-[#202020] mt-2 border-none outline-none '
                placeholder='Enter the title'
                onChange={e => setTitle(e.target.value)}
                value={title}
                required
              />
            </label>
            <label className='w-full'>
              <span className='font-semibold'>Description</span>
              <Textarea
                ref={textAreaRef}
                value={description}
                placeholder={'Write description...'}
                className='bg-[#202020] mt-2 w-full md:pr-[40px] pr-[30px] px-[16px] outline-none focus-visible:ring-0 resize-none border-none rounded-lg h-auto caret-violet-300'
                onChange={e => setDescription(e.target.value)}
                required
              />
            </label>
            <label>
              New topic {'( use if not present below )'}
              <div className='mt-1'>
                <Input
                  type='text'
                  className='focus-visible:ring-0 bg-[#202020] border-none outline-none '
                  placeholder='Enter the title'
                  onChange={e => setTopic(e.target.value)}
                  value={topic}
                  required
                />
              </div>
            </label>
            <label>
              Select a topic
              <div className='mt-1'>
                <Select onValueChange={handleTopicChange} disabled={loading}>
                  <SelectTrigger className='bg-[#202020] border-none outline-none rounded-full  px-[16px] '>
                    <SelectValue
                      placeholder={loading ? 'Topics are loading..' : 'Choose a topic'}
                    />
                  </SelectTrigger>
                  <SelectContent className='bg-[#202020]'>
                    {topics?.map((topic: string) => {
                      return (
                        <SelectItem key={topic} className='bg-[#202020]' value={topic}>
                          {topic}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </label>

            <label
              className='flex w-fit flex-col justify-start items-start'
              htmlFor='uploadFile'
            >
              <span>Upload:</span>
              <span
                className={`text-white  font-semibold ${
                  generatingTempUrl ? 'bg-[#202020] animate-pulse' : 'bg-[#202020]'
                } cursor-pointer group px-4 mt-1 py-1 rounded-full`}
              >
                <span
                  className={`${
                    generatingTempUrl ? '' : 'group-active:scale-[0.95]'
                  } inline-block `}
                >
                  {' '}
                  {generatingTempUrl ? 'Uploading...' : 'Upload File'}
                </span>
              </span>
              <input
                type='file'
                onChange={handleFileUpload}
                id='uploadFile'
                disabled={generatingTempUrl}
                accept='.docx,.pdf,.ppt,.doc'
                className='h-0 w-0'
              />
            </label>
            <div className='flex gap-3 flex-col mt-3 mb-5'>
              {attachments.map(file => {
                return (
                  <div
                    className='flex flex-col relative gap-2 justify-between p-4 bg-neutral-800 rounded-lg'
                    key={file._id}
                  >
                    <button
                      className='absolute right-3 top-3 active:scale-[0.9]'
                      onClick={() =>
                        setAttachMents(prev =>
                          prev.filter(attachmentFile => attachmentFile._id !== file._id)
                        )
                      }
                    >
                      <RxCross2 size={20} />
                    </button>
                    <div className='text-left'>
                      <h3 className='text-xl font-medium text-wrap'>
                        {file.originalFilename?.slice(0, 25)}
                        {/* @ts-ignore */}
                        {file.originalFilename?.length > 25 && '...'}
                      </h3>
                      <p className='text-sm text-neutral-200'>
                        {file.extension.toUpperCase()} document
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      {(file.extension === 'pptx' || file.extension === 'ppt') && (
                        <BsFiletypePpt fill='#FFAF45' size={24} />
                      )}
                      {file.extension === 'docx' && (
                        <BsFiletypeDocx fill='#5BBCFF' size={24} />
                      )}
                      {file.extension === 'pdf' && (
                        <BsFiletypePdf fill='#FF204E' size={24} />
                      )}
                      <Link href={file.url} target='_blank'>
                        <span className='text-sm text-neutral-200 hover:underline'>
                          View File
                        </span>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <Button
              type='submit'
              disabled={generatingTempUrl || uploading}
              className={` ${
                uploading && 'animate-pulse'
              }text-white px-4 py- group rounded-full bg-primary font-bold `}
            >
              <span className='inline-block active:scale-90 text-white group-active:scale-90'>
                {uploading ? 'Posting...' : 'Post'}
              </span>
            </Button>
            <button
              type='button'
              onClick={handleCloseModal}
              className={` ${
                uploading && 'animate-pulse'
              }text-white px-4 py-2 rounded-full group hover:bg-neutral-800/60 bg-neutral-800 font-bold `}
            >
              <span className='inline-block group-active:scale-90'>Cancel</span>
            </button>
          </div>
          {(classWorkError || error || sanityError) && (
            <div className='w-full flex items-center justify-center gap-2 text-center mt-2 text-red-500'>
              <IoWarningOutline fill='red' size={20} />
              {classWorkError || error || sanityError}
            </div>
          )}
        </form>
      ) : (
        <div
          className='flex group cursor-pointer items-center md:p-[22px] p-[16px] bg-neutral-900 rounded-[20px]'
          onClick={() => setOpenModal(prev => !prev)}
        >
          <div className='flex items-center gap-[10px]'>
            {authUser?.userProfileImage ? (
              <Image
                src={authUser?.userProfileImage || ''}
                alt='User profile image'
                height={48}
                width={48}
                className='aspect-square object-cover rounded-full'
                unoptimized
              />
            ) : (
              <Skeleton className='h-[48px] w-[48px] rounded-full' />
            )}
            <div className='flex items-start flex-col group-hover:underline '>
              <p>Any updates click here to create!</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ClassroomClassworkCreator
