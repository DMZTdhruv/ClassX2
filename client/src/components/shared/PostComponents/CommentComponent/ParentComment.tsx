'use client'

import { formatDate } from '@/utils'
import Image from 'next/image'
import SubComment from './SubComment'
import { type ReplyComment } from '@/lib/demoApi'
import { useEffect, useState } from 'react'
import useCookieProvider from '@/hooks/useCookieProvider'
import { Api } from '@/Constants'

interface UpdateReplyCommentData {
  parentCommentId: string
  repliedUserId: string
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

interface GetSubComment {
  _id: string
  parentCommentId: string
  postId: string
  repliedUserId: string
  commentText: string
  postedBy: {
    userProfileImage: string
    username: string
    _id: string
  }
  likes: string[]
  createdAt: string
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
  userRepliedComments: GetSubComment[]
  updateRepliedComments: () => void
}

export default function ParentComment({
  postId,
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
  userRepliedComments,
  updateRepliedComments,
}: Comment) {
  const date = new Date(parentCommentPostedDate)
  const formatedDate = formatDate(date)
  const cookie = useCookieProvider()
  // states
  const [isOpeningRepliedComments, setIsOpeningRepliedComments] =
    useState<boolean>(false)
  const [openRepliedComments, setOpenRepliedComments] = useState<boolean>(false)
  const [repliedComments, setRepliedComments] = useState([])
  const [isLiked, setIsLiked] = useState<boolean>(
    parentCommentTotalLikes.filter(id => id === cookie?.userProfileId).length >
      0
  )
  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    parentCommentTotalLikes.length
  )
  const [userRepliedCommentsLength, setUserRepliedCommentsLength] =
    useState<number>(userRepliedComments.length)

  useEffect(() => {
    setUserRepliedCommentsLength(userRepliedComments.length)
  }, [userRepliedComments])
  // loading states

  const getRepliedComments = async () => {
    if (repliedComments.length > 0) return
    setIsOpeningRepliedComments(true)
    try {
      const response = await fetch(
        `${Api}/post/comment/sub-comment?parentCommentId=${_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookie?.cookie}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('There was an error in getting the replied comments')
      }

      const { data: result } = await response.json()
      console.log(result)
      updateRepliedComments()
      setRepliedComments(result)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setIsOpeningRepliedComments(false)
    }
  }

  const likeComment = async () => {
    if (isLiked) return
    setNumberOfLikes(numberOfLikes + 1)
    try {
      const response = await fetch(`${Api}/post/comment/like-comment`, {
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

    try {
      const response = await fetch(`${Api}/post/comment/unlike-comment`, {
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
              <div className='flex items-center gap-[10px] justify-start mt-3'>
                <span className='w-[25px] h-[2px] bg-neutral-400 rounded-[2px] mt-[] '></span>
                <button
                  className=' text-neutral-500 flex items-center gap-3'
                  onClick={() => {
                    setOpenRepliedComments(prev => !prev)
                    getRepliedComments()
                  }}
                >
                  {openRepliedComments
                    ? 'Hide replies'
                    : `View replies (${parentTotalCommentReplies})`}

                  {isOpeningRepliedComments && <div className='loader '></div>}
                </button>
              </div>
              {openRepliedComments && (
                <div className='flex flex-col w-full justify-start'>
                  {repliedComments?.map((comment: ReplyComment) => (
                    <SubComment
                      key={comment._id}
                      _id={comment._id}
                      postId={postId}
                      parentCommentId={_id}
                      subCommentUserId={comment.postedBy._id}
                      subCommentImage={comment.postedBy.userProfileImage}
                      subCommentUsername={comment.postedBy.username}
                      subCommentCommentText={comment.commentText}
                      subCommentPostedDate={comment.createdAt}
                      subCommentTotalLikes={comment.likes}
                      updateUsername={updateUsername}
                      updateReplyCommentData={updateReplyCommentData}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          {userRepliedCommentsLength > 0 &&
            userRepliedComments[0].parentCommentId === _id && (
              <div className='text-[13px] flex flex-col items-start gap-[10px]'>
                <div className='flex items-center gap-[10px] justify-start mt-3'>
                  <span className='w-[25px] h-[2px] bg-neutral-400 rounded-[2px] mt-[] '></span>
                  <button
                    className=' text-neutral-500 flex items-center gap-3'
                    onClick={() => {
                      setOpenRepliedComments(prev => !prev)
                      getRepliedComments()
                    }}
                  >
                    {parentTotalCommentReplies > 0
                      ? `View replies (${parentTotalCommentReplies})`
                      : `Hide replies`}

                    {isOpeningRepliedComments && (
                      <div className='loader '></div>
                    )}
                  </button>
                </div>
                <div className='w-full'>
                  {userRepliedComments?.map((comment: GetSubComment) => {
                    if (_id === comment.parentCommentId) {
                      return (
                        <SubComment
                          key={comment._id}
                          _id={comment._id}
                          postId={comment.postId}
                          parentCommentId={comment.parentCommentId}
                          subCommentUserId={comment.postedBy._id}
                          subCommentImage={comment.postedBy.userProfileImage}
                          subCommentUsername={comment.postedBy.username}
                          subCommentCommentText={comment.commentText}
                          subCommentPostedDate={comment.createdAt}
                          subCommentTotalLikes={comment.likes}
                          updateUsername={updateUsername}
                          updateReplyCommentData={updateReplyCommentData}
                        />
                      )
                    }
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
