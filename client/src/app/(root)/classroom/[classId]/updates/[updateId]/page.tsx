'use client'

import ClassroomImageModal from '@/components/classroom/ClassroomImageModal'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import useGetUpdate from '@/hooks/classroom/useGetUpdate'
import { formatDate } from '@/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const Update = ({ params }: { params: { classId: string; updateId: string } }) => {
  const { loading, error, getClassroomUpdate, updateData } = useGetUpdate()
  const updateRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [imageOpenModal, setImageOpenModal] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState('')

  useEffect(() => {
    getClassroomUpdate(params.classId, params.updateId)
  }, [])
  useEffect(() => {
    if (updateRef.current) {
      updateRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) // Scroll the component into view
    }
  }, [])

  if (loading) {
    return (
      <div className='w-full p-[16px] md:p-[30px] flex flex-col gap-3'>
        <Skeleton className='h-[50px] w-[300px]  rounded-[20px] ' />
        <div className='space-y-2'>
          <Skeleton className='h-[50px] w-full  rounded-[20px] ' />
          <Skeleton className='h-[250px] w-full  rounded-[20px] ' />
          <Skeleton className='h-[250px] w-[250px]  rounded-[20px] ' />
        </div>
      </div>
    )
  }

  // @ts-ignore
  const formattedDate = formatDate(new Date(updateData?.createdAt))
  const closeModal = () => {
    setImageOpenModal(false)
    setSelectedImage('')
  }
  return (
    <div className='w-full sm:p-[16px] p-[6px] md:p-[30px]'>
      {imageOpenModal && (
        <ClassroomImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}
      <div className='  rounded-xl sm:p-6 p-2 mb-8'>
        <article className='flex items-start flex-col gap-2 '>
          <div className='bg-neutral-900/80 w-full rounded-xl p-6'>
            <header>
              <h1 className='text-[20px] font-bold text-neutral-200'>
                {updateData?.title}
              </h1>
            </header>
            <pre className='text-wrap font-poppins text-neutral-300'>
              {updateData?.description}
            </pre>
          </div>
          {updateData?.attachments && (
            <div className='my-3 p-6 flex flex-col gap-3 bg-neutral-900/80 rounded-xl'>
              {updateData.attachments?.length > 0 && (
                <Carousel className='max-w-[300px]  rounded-md  max-h-[300px]'>
                  <CarouselContent className='max-w-[300px]  max-h-[300px] rounded-md'>
                    {updateData.attachments?.map(image => {
                      return (
                        <CarouselItem className='rounded-md' key={image}>
                          <Image
                            src={image}
                            alt='image'
                            width={150}
                            height={150}
                            unoptimized
                            onClick={() => {
                              setImageOpenModal(prev => !prev)
                              setSelectedImage(image)
                            }}
                            className='aspect-square w-full h-full object-cover rounded-md'
                          />
                        </CarouselItem>
                      )
                    })}
                  </CarouselContent>
                </Carousel>
              )}
              <div>
                <p className='mt-2 font-semibold text-neutral-200'>
                  Total attachments: {updateData.attachments.length}
                </p>
                <span className='mt-1 text-[13px] text-neutral-600'>
                  Drag images to move left and right
                </span>
              </div>
            </div>
          )}
        </article>
        <div className='gap-[10px] flex justify-between px-6 border-t-2 border-neutral-900/80 pt-6 mt-6'>
          <p className='text-neutral-300'>Posted by</p>
          <div className='flex gap-2 mt-2'>
            {updateData?.postedBy.userProfileImage ? (
              <Image
                src={updateData?.postedBy.userProfileImage}
                alt='User profile image'
                height={48}
                width={48}
                className='aspect-square object-cover rounded-full'
                unoptimized
              />
            ) : (
              <Skeleton className='h-[48px] w-[48px] rounded-full' />
            )}

            <div className='flex items-start gap-1 flex-col'>
              <p className='text-[15px] font-semibold' ref={updateRef}>
                {updateData?.postedBy.username}
              </p>
              <p className='opacity-50 text-[13px]'>Posted {formattedDate} ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update
