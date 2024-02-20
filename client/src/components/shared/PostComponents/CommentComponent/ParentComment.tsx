'use client'

import { formatDate } from '@/utils'
import Image from 'next/image'
import SubComment from './SubComment'
import { type ReplyComment } from '@/lib/demoApi'
import { useState } from 'react'
import useCookieProvider from '@/hooks/useCookieProvider'

interface UpdateReplyCommentData {
  parentCommentId: string
  repliedUserId: string
}

interface Comment {
  postId: string
  _id: string
  parentCommentImage: string
  parentCommentUserId: string
  parentCommentUsername: string
  parentCommentCommentText: string
  parentCommentPostedDate: string
  parentCommentTotalLikes: string[]
  parentTotalCommentReplies: number
  updateUsername: (name: string) => void
  updateReplyCommentData: (data: UpdateReplyCommentData) => void
}

interface Cookie {
  userProfileId: string
  cookie: string
}

interface PostLikes {
  _id: string
  isLiked: boolean
  setNumberOfLikes: (newNumberOfLikes: number) => void
  numberOfLikes: number
  cookie?: Cookie | null
  endPoint: string
  isDevMode?: boolean | null
}

//implement a reply button

export default function ParentComment({
  _id,
  parentCommentImage,
  parentCommentUserId,
  parentCommentUsername,
  parentCommentCommentText,
  parentCommentPostedDate,
  parentCommentTotalLikes,
  parentTotalCommentReplies,
  updateUsername,
  updateReplyCommentData,
}: Comment) {
  console.log(parentTotalCommentReplies)
  const date = new Date(parentCommentPostedDate)
  const formatedDate = formatDate(date)
  const cookie = useCookieProvider()

  // states
  const [openRepliedComments, setOpenRepliedComments] = useState<boolean>(false)
  const [repliedComments, setRepliedComments] = useState([])
  const [isLiked, setIsLiked] = useState<boolean>(
    parentCommentTotalLikes.filter(id => id === cookie?.userProfileId).length >
      0
  )

  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    parentCommentTotalLikes.length
  )
  const [commentReplies, setCommentReplies] = useState<string[]>([])

  const likePost = async () => {
    if (isLiked) return
    setNumberOfLikes(numberOfLikes + 1)
    const api = process.env.NEXT_PUBLIC_API
    try {
      const response = await fetch(`${api}/post/comment/like-comment`, {
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
      console.log(err)
    }
  }

  const unlikePost = async () => {
    if (!isLiked) return
    setNumberOfLikes(numberOfLikes - 1)
    const api = process.env.NEXT_PUBLIC_API

    try {
      const response = await fetch(`${api}/post/comment/unlike`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${cookie?.cookie}`,
        },
        body: JSON.stringify({
          userProfileID: cookie?.userProfileId,
          postId: _id,
        }),
      })

      if (!response.ok) {
        setIsLiked(false)
        setNumberOfLikes(numberOfLikes)
        throw new Error('Error unliking the post ')
      }

      const result = await response.json()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='flex py-[12px] px-[15px] gap-3 items-start'>
      <Image
        src={parentCommentImage}
        alt=''
        width={30}
        height={30}
        style={{
          width: '30px',
          height: '30px',
        }}
        unoptimized
        className='aspect-square object-cover rounded-full'
      />
      <div className='flex  justify-between items-start w-full '>
        <div className='space-y-[5px] w-full'>
          <div className='flex justify-between flex-1 w-full'>
            <p className=' flex-1 w-full '>
              <span className='font-semibold text-[14px] lg:text-[15px]'>
                {parentCommentUsername} &nbsp;
              </span>
              <span className='text-[13px] lg:text-[15px]'>
                {parentCommentCommentText}
              </span>
            </p>
            <button
              className='hover:scale-105 p-2 flexCenter w-auto'
              onClick={() => {
                setIsLiked(prev => !prev)
                likePost()
                unlikePost()
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
          <div className='text-[12px] text-neutral-500 flex gap-[10px] '>
            <p suppressHydrationWarning={true}>{formatedDate}</p>
            <p>{numberOfLikes} likes</p>
            <button
              onClick={() => {
                updateUsername(parentCommentUsername)
                updateReplyCommentData({
                  parentCommentId: _id,
                  repliedUserId: parentCommentUserId,
                })
              }}
            >
              Reply
            </button>
          </div>
          {parentTotalCommentReplies > 0 && (
            <div className='text-[13px] flex flex-col items-start gap-[10px]'>
              <div className='flex items-center gap-[10px] justify-start'>
                <span className='w-[20px] h-[2px] bg-neutral-400 rounded-[2px] '></span>
                <button
                  onClick={() => {
                    setOpenRepliedComments(prev => !prev)
                  }}
                >
                  View replies ({parentTotalCommentReplies})
                </button>
              </div>
              {openRepliedComments && (
                <div className='flex flex-col'>
                  {repliedComments.map((comment: ReplyComment) => {
                    return (
                      <SubComment
                        key={comment.id}
                        _id={comment.id}
                        subCommentImage={'/il.png'}
                        subCommentUsername={comment.postedBy.username}
                        subCommentCommentText={comment.commentText}
                        subCommentPostedDate={'2024-02-13T10:52:47.423+00:00'}
                        subCommentTotalLikes={comment.likes.length}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
