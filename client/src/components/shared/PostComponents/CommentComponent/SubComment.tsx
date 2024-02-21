'use client'

import { webUrl } from '@/Constants'
import useCookieProvider from '@/hooks/useCookieProvider'
import { formatDate } from '@/utils'
import { likePost, unlikePost } from '@/utils/LikeFunctions'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
interface SubComments {
  _id: string
  subCommentImage: string
  subCommentUsername: string
  subCommentCommentText: string
  subCommentPostedDate: string
  subCommentTotalLikes: string[]
}

export default function SubComment({
  _id,
  subCommentImage,
  subCommentUsername,
  subCommentCommentText,
  subCommentPostedDate,
  subCommentTotalLikes,
}: SubComments) {
  const cookie = useCookieProvider()
  const date = new Date(subCommentPostedDate)
  const formatedDate = formatDate(date)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    subCommentTotalLikes.length
  )
  const user = subCommentCommentText.split(' ')[0]
  const userComment = subCommentCommentText.split(' ').slice(1).join(' ')
  console.log({ user, userComment })
  return (
    <div className='flex py-[12px] pr-[7.5px] gap-3 items-start'>
      <Image
        src={subCommentImage}
        alt={subCommentCommentText}
        width={30}
        height={30}
        style={{
          width: '30px',
          height: '30px',
        }}
        unoptimized
        className='aspect-square object-cover rounded-full'
      />
      <div className='flex flex-1 flex-col gap-3'>
        <p>
          <span className='font-semibold text-[14px] lg:text-[15px]'>
            {subCommentUsername} &nbsp;
          </span>
          <span className='text-[13px] lg:text-[15px]'>
            <Link
              className='text-slate-400'
              href={`${webUrl}/user-profile/${user}`}
            >
              {user}
            </Link>{' '}
            {userComment}
          </span>
        </p>
        <div className='text-[12px] text-neutral-500 flex gap-[10px] '>
          <p>{formatedDate}</p>
          <p>{numberOfLikes} likes</p>
          <button>Reply</button>
        </div>
      </div>
      <button
        className='hover:scale-105  flexCenter w-auto'
        onClick={() => {
          setIsLiked(prev => !prev)
          likePost({
            _id,
            isLiked,
            setNumberOfLikes,
            numberOfLikes,
            cookie,
            endPoint: '',
            isDevMode: true,
          })
          unlikePost({
            _id,
            isLiked,
            setNumberOfLikes,
            numberOfLikes,
            cookie,
            endPoint: '',
            isDevMode: true,
          })
        }}
      >
        {isLiked ? (
          <Image
            src={`/bxs_heart.svg`}
            width={15}
            height={15}
            alt='user jpg'
            className='aspect-square object-cover active:scale-90 transition-all'
            style={{
              width: '15px',
              height: '15px',
            }}
          />
        ) : (
          <Image
            src={`/heart.svg`}
            width={15}
            height={15}
            alt='user jpg'
            className='aspect-square object-cover active:scale-90 transition-all'
            style={{
              width: '15px',
              height: '15px',
            }}
          />
        )}
      </button>
    </div>
  )
}
