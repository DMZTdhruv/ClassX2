'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import useCookieProvider from '@/hooks/useCookieProvider'
import { formatDate } from '@/utils'
import Link from 'next/link'
import { likePost, unlikePost } from '@/utils/LikeFunctions'

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
  likes: string[]
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
  const [numberOfLikes, setNumberOfLikes] = useState<number>(likes.length)
  const [isLiked, setIsLiked] = useState<boolean>(
    likes.filter(id => id === cookie?.userProfileId).length > 0
  )

  const [showFullcaption, setShowFullCaption] = useState<boolean>(false)
  return (
    <div className='w-full lg:w-[584px] h-auto rounded-xl border-b-2 border-[#171717] font-poppins  postSection'>
      <div className='h-[60px] px-[16px] flex items-center text-[15px]'>
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
            unoptimized
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
          className='object-cover  md:w-[584px] md:h-[584px] border-2 border-[#171717]'
          quality={100}
          unoptimized
        />
      </div>
      <div>
        <div className='px-[12px] gap-[15px] md:h-[60px] h-[45px]  w-full flex items-center mt-[3px]'>
          <button
            onClick={() => {
              setIsLiked(prev => !prev)
              likePost({
                _id,
                isLiked,
                setNumberOfLikes,
                numberOfLikes,
                cookie,
                endPoint:"post/like-post",
              })
              unlikePost({
                _id,
                isLiked,
                setNumberOfLikes,
                numberOfLikes,
                endPoint: "post/like-post",
                cookie,
              })
            }}
            className='hover:scale-105'
          >
            {isLiked ? (
              <Image
                src={`bxs_heart.svg`}
                width={30}
                height={30}
                alt='user jpg'
                className='rounded-full object-cover active:scale-90 transition-all'
                style={{
                  width: '30px',
                  height: '30px',
                }}
              />
            ) : (
              <Image
                src={`heart.svg`}
                width={30}
                height={30}
                alt='user jpg'
                className='rounded-full object-cover active:scale-90 transition-all'
                style={{
                  width: '30px',
                  height: '30px',
                }}
              />
            )}
          </button>
          <Link href={`/post/${_id}`}>
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
          </Link>
        </div>
        <div className='px-[15px] md:text-[15px] flex flex-col gap-[3px] text-[13px] font-semibold mb-[20px] '>
          <span>{numberOfLikes} likes</span>
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
