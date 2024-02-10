'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import useCookieProvider from '@/hooks/useCookieProvider'

interface IComments {
  _id: string
  commentText: string
  postedBy: {
    _id: string
    username: string
  }
}

interface IPost {
  _id: string
  title: string
  imageUrl: string
  caption: string
  location: string
  category: string
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  likes: any
  comments: IComments[]
  createdAt: string
}

const Post: React.FC<IPost> = ({
  _id,
  title,
  imageUrl,
  caption,
  location,
  category,
  postedBy,
  likes,
  comments,
  createdAt,
}) => {
  const date = new Date(createdAt)
  const cookie = useCookieProvider()

  //states
  const [showFullcaption, setShowFullCaption] = useState<boolean>(false)
  return (
    <div className='w-full md:w-[584px] h-auto rounded-xl font-poppins bg-[#171717] postSection'>
      <div className='h-[60px] px-[16px] flex items-center'>
        <div className='flex items-center gap-[11px]'>
          <Image
            src={postedBy?.userProfileImage}
            width={30}
            height={30}
            alt='user jpg'
            className='rounded-full object-cover '
            style={{
              width: '30px',
              height: '30px',
            }}
            quality={100}
          />
          <div className='flex font-semibold gap-3 items-center'>
            <p className='flex items-center gap-3'>
              {postedBy?.username}{' '}
              <span className=' h-1 w-2 bg-neutral-600 rounded-full'></span>
            </p>
            <span className='text-neutral-500'> {formatDate(date)}</span>
          </div>
        </div>
      </div>
      <div>
        <Image
          src={imageUrl}
          width={384}
          height={0}
          alt={'post'}
          style={{ height: 'auto', width: '584px', aspectRatio: '1' }}
          className='object-cover  md:w-[584px] md:h-[584px]'
          quality={99}
        />
      </div>
      <div>
        <div className='px-[12px] gap-[15px] md:h-[60px] h-[45px]  w-full flex items-center mt-[3px]'>
          <button
            onClick={() => {

            }}
          >
            <Image
              src={`/assets/heart.svg`}
              width={30}
              height={30}
              alt='user jpg'
              unoptimized
              className='rounded-full object-cover '
              style={{
                width: '30px',
                height: '30px',
              }}
            />
          </button>
          <Image
            src={`/assets/comment.svg`}
            width={30}
            height={30}
            alt='user jpg'
            unoptimized
            className='rounded-full object-cover '
            style={{
              width: '30px',
              height: '30px',
            }}
          />
        </div>
        <div className='px-[15px] md:text-[15px] flex flex-col gap-[3px] text-[13px] font-semibold mb-[20px] '>
          <span>{likes} likes</span>
          {caption.length > 85 ? (
            showFullcaption ? (
              <div>
                {caption}
                <button
                  className='text-neutral-500 mx-[10px] inline-block'
                  onClick={() => {
                    setShowFullCaption(prev => !prev)
                  }}
                >
                  less
                </button>
              </div>
            ) : (
              <div>
                {caption.slice(0, 85)}...
                <button
                  className='text-neutral-500 mx-[10px] inline-block'
                  onClick={() => {
                    setShowFullCaption(prev => !prev)
                  }}
                >
                  more
                </button>
              </div>
            )
          ) : (
            <p>{caption}</p>
          )}
          <p className='text-neutral-500 inline-block'>
            view all {comments.length} comments
          </p>
          {comments.length !== 0 && (
            <p className='text-neutral-200'>
              {comments[0]?.postedBy?.username} {comments[0].commentText}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post

const formatDate = (date: Date) => {
  const now = new Date()
  const diffInMilliseconds = now.getTime() - date.getTime()

  const seconds = Math.floor(diffInMilliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return `${seconds} seconds ago`
  } else if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else {
    return `${days} days ago`
  }
}
