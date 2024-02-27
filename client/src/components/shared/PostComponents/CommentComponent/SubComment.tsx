'use client'

import { Api, webUrl } from '@/Constants'
import useCookieProvider from '@/hooks/useCookieProvider'
import { formatDate } from '@/utils'
import { likePost, unlikePost } from '@/utils/LikeFunctions'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Styles from './styles.module.css'

interface DeleteCommentDetails {
  userId: string
  deleteId: string
  clientComponent?: boolean
}

interface UpdateReplyCommentData {
  parentCommentId: string
  repliedUserId: string
}
interface SubComments {
  _id: string
  postId: string
  parentCommentId: string
  subCommentUserId: string
  subCommentImage: string
  subCommentUsername: string
  subCommentCommentText: string
  subCommentPostedDate: string
  subCommentTotalLikes: string[]
  updateUsername: (name: string) => void
  updateReplyCommentData: (data: UpdateReplyCommentData) => void
  clientComment?: boolean
  likeSubComment?: (_id: string) => void
  unlikeSubComment?: (_id: string) => void
  handleParentCommentModal: (data: boolean) => void
  setDeleteSubCommentDetails: (data: DeleteCommentDetails) => void
  deleteSubComment?: (data: string) => void
}

export default function SubComment({
  _id,
  postId,
  parentCommentId,
  subCommentUserId,
  subCommentImage,
  subCommentUsername,
  subCommentCommentText,
  subCommentPostedDate,
  subCommentTotalLikes,
  updateUsername,
  updateReplyCommentData,
  clientComment,
  likeSubComment,
  unlikeSubComment,
  handleParentCommentModal,
  setDeleteSubCommentDetails,
  deleteSubComment,
}: SubComments) {
  const cookie = useCookieProvider()
  const date = new Date(subCommentPostedDate)
  const formatedDate = formatDate(date)
  const [isLiked, setIsLiked] = useState<boolean>(
    subCommentTotalLikes.filter(id => id === cookie?.userProfileId).length > 0
  )
  const [numberOfLikes, setNumberOfLikes] = useState<number>(subCommentTotalLikes.length)
  const user = subCommentCommentText.split(' ')[0]
  const userComment = subCommentCommentText.split(' ').slice(1).join(' ')

  const likeComment = async () => {
    if (isLiked) return
    clientComment && likeSubComment?.(_id)
    setNumberOfLikes(numberOfLikes + 1)
    try {
      const response = await fetch(`${Api}/post/comment/sub/like-comment`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${cookie?.cookie}`,
        },
        body: JSON.stringify({
          commentId: _id,
          userID: cookie?.userProfileId,
        }),
      })

      if (!response.ok) {
        setIsLiked(false)
        setNumberOfLikes(numberOfLikes)
        throw new Error('Error liking in post ')
      }

      const result = await response.json()
    } catch (err) {
      console.error(err)
    }
  }

  const unlikeComment = async () => {
    if (!isLiked) return
    setNumberOfLikes(numberOfLikes - 1)
    clientComment && unlikeSubComment?.(_id)
    try {
      const response = await fetch(`${Api}/post/comment/sub/unlike-comment`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${cookie?.cookie}`,
        },
        body: JSON.stringify({
          userID: cookie?.userProfileId,
          commentId: _id,
        }),
      })

      if (!response.ok) {
        setIsLiked(false)
        setNumberOfLikes(numberOfLikes)
        throw new Error('Error unliking the post ')
      }

      const result = await response.json()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={`flex py-[12px] pr-[7.5px] gap-3 items-start ${Styles.subComment}`}>
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
          <span className='font-semibold text-[12px] lg:text-[14px]'>
            {subCommentUsername} &nbsp;
          </span>
          <span className='text-[12px] lg:text-[14px]'>
            <Link
              className='text-slate-400'
              href={`${webUrl}/user-profile/${user}`}
              prefetch={false}
            >
              {user}
            </Link>{' '}
            {userComment}
          </span>
        </p>
        <div className='text-[12px] text-neutral-500 flex gap-[10px] '>
          <p>{formatedDate}</p>
          <p>{numberOfLikes} likes</p>
          <button
            onClick={() => {
              updateUsername(subCommentUsername)
              updateReplyCommentData({
                parentCommentId: parentCommentId,
                repliedUserId: subCommentUserId,
              })
            }}
          >
            Reply
          </button>
          <button
            className={`${Styles.subCommentButton} lg:hidden space-x-[2px] items-center`}
            onClick={() => {
              handleParentCommentModal(true)
              if (clientComment) {
                setDeleteSubCommentDetails({
                  userId: subCommentUserId,
                  deleteId: _id,
                  clientComponent: true,
                })
              } else {
                setDeleteSubCommentDetails({
                  userId: subCommentUserId,
                  deleteId: _id,
                })
              }
            }}
          >
            <BsThreeDots size={18} />
          </button>
        </div>
      </div>
      <button
        className='hover:scale-105  flexCenter w-auto'
        onClick={() => {
          setIsLiked(prev => !prev)
          likeComment()
          unlikeComment()
        }}
      >
        {isLiked ? (
          <Image
            src={`/assets/filledHeart.svg`}
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
            src={`/assets/heart.svg`}
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
