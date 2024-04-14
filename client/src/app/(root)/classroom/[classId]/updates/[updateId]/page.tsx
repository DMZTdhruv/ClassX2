'use client'

import ClassroomImageModal from '@/components/classroom/ClassroomImageModal'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import useGetUpdate from '@/hooks/classroom/useGetUpdate'
import { formatDate } from '@/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { format } from 'path'
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'

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
      <div className='px-[16px] pt-[15px] pb-[60px] flex flex-col gap-3'>
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
  const formatedDate = formatDate(new Date(updateData?.createdAt))
  const closeModal = () => {
    setImageOpenModal(false)
    setSelectedImage('')
  }
  return (
    <div className='px-[16px] pt-[15px]  pb-[60px] flex flex-col gap-3'>
      {imageOpenModal && (
        <ClassroomImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}
      <div className='flex items-center gap-[10px]'>
        <Image
          src={updateData?.postedBy.userProfileImage || ''}
          alt='User profile image'
          height={48}
          width={48}
          className='aspect-square rounded-full'
          unoptimized
        />
        <div className='flex items-start gap-1 flex-col'>
          <p className='text-[15px] font-semibold' ref={updateRef}>
            {updateData?.postedBy.username}
          </p>
          <p className='opacity-50 text-[13px]'>Posted {formatedDate} ago</p>
        </div>
      </div>
      <article className='flex items-start flex-col gap-2'>
        <header>
          <h1 className='text-[20px] font-bold'>{updateData?.title}</h1>
        </header>
        <p>
          <pre className='text-wrap font-poppins'>{updateData?.description}</pre>
        </p>
        {updateData?.attachments && (
          <div>
            {updateData.attachments?.length > 0 && (
              <Carousel className='max-w-[300px] rounded-md mt-3 max-h-[300px]'>
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

                <p className='mt-2 font-semibold'>
                  Total attachments: {updateData.attachments.length}
                </p>
                <span className='mt-1 text-[13px] text-neutral-600'>
                  Drag images to move left and right
                </span>
              </Carousel>
            )}
          </div>
        )}
      </article>
    </div>
  )
}

export default Update
