'use client'

import { useAuthContext } from '@/context/AuthContext'
import React, { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import CustomTextArea from '../shared/ChatComponents/CustomTextArea'
import useCreateUpdate from '@/hooks/classroom/useCreateUpdate'

interface IClassroomUpdate {
  classId: string
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

  useEffect(() => {
    if (authUser?.userProfileId) {
      setIsAdmin(adminIds.includes(authUser.userProfileId))
    } else {
      setIsAdmin(false)
    }
  }, [authUser])

  if (!isAdmin) {
    return null
  }

  const createUpdateForClassroom = async (e: FormEvent) => {
    e.preventDefault()
    if (description.trim() === '') {
      return
    }
    const updateObj: IClassroomUpdate = {
      classId,
      description,
      attachments,
    }
    await createUpdate(updateObj)
    setDescription('')
  }

  return (
    <section>
      {openModal ? (
        <form
          className='bg-neutral-900 relative flex flex-col items-end  md:p-[22px] p-[16px] rounded-[20px]'
          onSubmit={createUpdateForClassroom}
        >
          <CustomTextArea
            placeholder='Write something...'
            className='bg-[#171717] w-full md:pr-[40px] pr-[30px] outline-none focus-visible:ring-0 resize-none border-none rounded-lg h-auto caret-violet-300'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className='flex items-start gap-3'>
            <button
              type='submit'
              disabled={loading}
              className={` ${
                loading && 'animate-pulse'
              }text-white px-4 py-2 group rounded-full bg-primary font-bold `}
            >
              <span className='inline-block active:scale-90 group-active:scale-90'>
                {loading ? 'Posting...' : 'Post'}
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
              className='aspect-square rounded-full'
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
