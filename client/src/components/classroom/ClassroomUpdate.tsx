'use client'

import React from 'react'
import Image from 'next/image'
import { formatDate } from '@/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface IClassroomUpdate {
  postedBy: {
    username: string
    userProfileImage: string
  }
  createdAt: string
  title?: string
  description: string
  attachments: string[] | undefined
}

const ClassroomUpdate = ({
  classroomUpdate,
}: {
  classroomUpdate: IClassroomUpdate
}) => {
  const { postedBy, createdAt, title, description, attachments } = classroomUpdate
  const formatedDate = formatDate(new Date(createdAt))

  return (
    <Dialog>
      <DialogTrigger>
        <article className=' h-fit p-[24px] bg-neutral-900  rounded-[20px]'>
          <div className='flex items-center gap-[10px]'>
            <Image
              src={postedBy.userProfileImage || ''}
              alt='User profile image'
              height={48}
              width={48}
              className='aspect-square rounded-full'
              unoptimized
            />
            <div className='flex items-start flex-col'>
              <p className='text-[15px] font-semibold'>{postedBy.username}</p>
              <p className='opacity-50 text-[13px]'>Posted {formatedDate} ago</p>
            </div>
          </div>
          <p className='pt-[18px] text-left'>
            {description.slice(0, 150)}
            <span>{description.length > 150 && '...'}</span>
          </p>
        </article>
      </DialogTrigger>
      <DialogContent className='border h-screen-80 border-neutral-800 min-w-[80vw] '>
        <DialogHeader>
          <DialogTitle className='mb-3'>
            <div className='flex items-center gap-[10px]'>
              <Image
                src={postedBy.userProfileImage || ''}
                alt='User profile image'
                height={48}
                width={48}
                className='aspect-square rounded-full'
                unoptimized
              />
              <div className='flex items-start gap-2 flex-col'>
                <p className='text-[15px] font-semibold'>{postedBy.username}</p>
                <p className='opacity-50 text-[13px]'>Posted {formatedDate} ago</p>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className='text-white text-left h-full  overflow-y-auto'>
            <ScrollArea className='h-full w-full border-none rounded-md pr-1 py-1'>
              <article className='flex items-start flex-col gap-2'>
                <header>
                  <h1 className='text-[20px] font-bold'>{title}</h1>
                </header>
                <p>
                  <pre className='text-wrap font-poppins'>{description}</pre>
                </p>
                {attachments && (
                  <div>
                    {attachments?.length > 0 && (
                      <Carousel className='max-w-[300px] rounded-md mt-3 max-h-[300px]'>
                        <CarouselContent className='max-w-[300px]  max-h-[300px] rounded-md'>
                          {attachments?.map(image => {
                            return (
                              <CarouselItem className='rounded-md' key={image}>
                                <Image
                                  src={image}
                                  alt='image'
                                  width={150}
                                  height={150}
                                  className='aspect-square w-full h-full object-cover rounded-md'
                                  unoptimized
                                />
                              </CarouselItem>
                            )
                          })}
                        </CarouselContent>
                        <p className='mt-2 font-semibold'>
                          Total attachments: {attachments.length}
                        </p>
                        <span className='mt-1 text-[13px] text-neutral-600'>
                          Drag images to move left and right
                        </span>
                      </Carousel>
                    )}
                  </div>
                )}
              </article>
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ClassroomUpdate
