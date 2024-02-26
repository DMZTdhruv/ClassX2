'use client'

import Styles from './styles.module.css'
import { formatDate } from '@/utils'
import Image from 'next/image'
import SubComment from './SubComment'
import React, { useEffect, useState } from 'react'
import useCookieProvider from '@/hooks/useCookieProvider'
import { Api } from '@/Constants'
import { BsThreeDots } from 'react-icons/bs'

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

interface ISubComment {
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
  userRepliedComments: ISubComment[]
  updateRepliedComments: () => void
  likeSubComment: (_id: string) => void
  unlikeSubComment: (_id: string) => void
  handleModal: (data: boolean) => void
}

interface BackendData {
  data: ISubComment[]
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
  userRepliedComments, // our replied comments
  updateRepliedComments,
  likeSubComment,
  unlikeSubComment,
  handleModal,
}: Comment) {
  const date = new Date(parentCommentPostedDate)
  const formatedDate = formatDate(date)
  const cookie = useCookieProvider()
  // states
  const [subComments, setSubComments] = useState<ISubComment[] | null>(null)

  const [isOpeningRepliedComments, setIsOpeningRepliedComments] =
    useState<boolean>(false)
  const [openRepliedComments, setOpenRepliedComments] = useState<boolean>(false)
  const [openUserRepliedComments, setOpeningUserRepliedComments] =
    useState<boolean>(true)
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

  const [isUserRepliedCommentsOpen, setIsUserRepliedCommentsOpen] =
    useState<boolean>(userRepliedComments.length > 0)

  const [totalCommentReplies, setTotalCommentReplies] = useState<number>(
    parentTotalCommentReplies
  )

  useEffect(() => {
    setUserRepliedCommentsLength(userRepliedComments.length)
  }, [userRepliedComments])

  const getRepliedComments = async (parentCommentId: string) => {
    if (subComments?.length! >= totalCommentReplies) {
      return
    }
    if (openRepliedComments) {
      setSubComments(prev => [...(prev || []), ...userRepliedComments])
      setTotalCommentReplies(prev => prev + userRepliedComments.length)
      updateRepliedComments()
      return
    }

    setIsOpeningRepliedComments(true)
    try {
      const response = await fetch(
        `${Api}/post/comment/sub-comment?parentCommentId=${parentCommentId}`,
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

      const { data: result }: BackendData = await response.json()

      if (parentCommentId === userRepliedComments[0]?.parentCommentId) {
        setTotalCommentReplies(result.length)
        updateRepliedComments()
      }
      setSubComments(result)
      return
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
    <div className='my-[10px]'>
      <div className=''></div>
      <div
        className={`flex pt-[12px] px-[15px] gap-3 ${Styles.parentComment} items-start`}
      >
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
                <span className='font-semibold text-[12px] lg:text-[13px]'>
                  {parentCommentUsername} &nbsp;
                </span>
                <span className='text-[12px] lg:text-[13px]'>
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
            <div className='text-[12px] text-neutral-500 flex items-center gap-[10px] '>
              <p suppressHydrationWarning={true}>{formatedDate}</p>
              {numberOfLikes > 0 && <p>{numberOfLikes} likes</p>}
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
              <button
                className={`${Styles.parentCommentButton} lg:hidden space-x-[2px] items-center`}
                onClick={() => handleModal(true)}
              >
                <BsThreeDots size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full pl-[57px]'>
        {parentTotalCommentReplies > 0 && (
          <div className='text-[12px] flex flex-col items-start gap-[10px]'>
            <div className='flex items-center gap-[10px] justify-start mt-3'>
              <span className='w-[25px] h-[2px] bg-neutral-400 rounded-[2px] '></span>
              <button
                className=' text-neutral-500 flex items-center gap-3'
                onClick={() => {
                  if (userRepliedComments.length > 0) {
                    setSubComments(prev => [
                      ...(prev || []),
                      ...userRepliedComments,
                    ])
                    setTotalCommentReplies(
                      prev => prev + userRepliedComments.length
                    )
                    updateRepliedComments()
                  }
                  setOpenRepliedComments(prev => !prev)
                  getRepliedComments(_id)
                }}
              >
                {openRepliedComments
                  ? 'Hide replies'
                  : `View replies (${totalCommentReplies})`}

                {isOpeningRepliedComments && <div className='loader '></div>}
              </button>
            </div>
            {openRepliedComments && subComments && (
              <div className='flex flex-col w-full justify-start'>
                {subComments?.map((comment: ISubComment, index: number) => (
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
        {userRepliedComments &&
          userRepliedCommentsLength > 0 &&
          userRepliedComments[0]?.parentCommentId === _id && (
            <div className='text-[12px] flex flex-col items-start gap-[10px]'>
              {userRepliedComments.length >= 1 &&
                parentTotalCommentReplies === 0 && (
                  <div className='flex items-center gap-[10px] justify-start mt-3'>
                    <span className='w-[25px] h-[2px] bg-neutral-400 rounded-[2px]'></span>
                    <button
                      className=' text-neutral-500 flex items-center gap-3'
                      onClick={() => {
                        setOpeningUserRepliedComments(prev => !prev)
                      }}
                    >
                      {openUserRepliedComments
                        ? `Hide replies`
                        : `View replies (${userRepliedComments.length})`}
                      {isOpeningRepliedComments && (
                        <div className='loader '></div>
                      )}
                    </button>
                  </div>
                )}
              {openUserRepliedComments && (
                <div className='w-full'>
                  {userRepliedComments?.map((comment: ISubComment) => {
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
                          clientComment={true}
                          likeSubComment={likeSubComment}
                          unlikeSubComment={unlikeSubComment}
                        />
                      )
                    }
                  })}
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  )
}
