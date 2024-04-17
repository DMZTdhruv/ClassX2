'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { formatMessageSideBarDate } from '@/utils/formatDate'
import Link from 'next/link'
import { IPost } from '@/Constants'
import { likePost, savePost, unSavePost, unlikePost } from '@/utils/LikeFunctions'
import { BsThreeDots } from 'react-icons/bs'
import { useAuthContext } from '@/context/AuthContext'
import { Skeleton } from '../ui/skeleton'
import { comment } from 'postcss'
import useLikePost from '@/hooks/posts/useLikePost'
import useUnlikePost from '@/hooks/posts/useUnlikePost'

const Post: React.FC<IPost> = ({
  _id,
  title,
  imageUrl,
  index,
  caption,
  location,
  category,
  postedBy,
  likes,
  serverRenderedPost,
  comments,
  saved,
  createdAt,
  handleDeletePostDetails,
  handleDeleteModal,
}) => {
  const date = new Date(createdAt)

  //@ts-ignore
  const { authUser } = useAuthContext()
  const { likePost } = useLikePost()
  const { unlikePost } = useUnlikePost()

  const [numberOfLikes, setNumberOfLikes] = useState<number>(likes.length)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [showFullCaption, setShowFullCaption] = useState<boolean>(false)
  const [loadingImage, setLoadingImage] = useState<boolean>(false)

  useEffect(() => {
    setIsLiked(likes.filter(id => id === authUser?.userProfileId).length > 0)
    setIsSaved(saved?.filter(id => id === authUser?.userProfileId).length > 0)
  }, [authUser])

  return (
    <div className='w-full animate-in fade-in-0 lg:w-[544px] h-auto  border-b-2 border-[#171717] font-poppins  postSection'>
      <div className='h-[60px] px-[15px] flex items-center justify-between md:text-[14px] text-[12px]'>
        <div className='flex items-center justify-between w-full gap-[11px]'>
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
              <div>
                <div className='flex items-center gap-2'>
                  <Link
                    href={`/profile/${postedBy._id}`}
                    className='flex items-center gap-3'
                  >
                    {postedBy?.username}
                  </Link>
                  <span className=' h-1 w-1 bg-neutral-600 rounded-full'></span>
                  <span
                    className='text-neutral-500 md:text-[13px] text-[11px]'
                    suppressHydrationWarning={true}
                  >
                    {formatMessageSideBarDate(date)}
                  </span>
                </div>
                <span className='text-[12px] '>{location}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              handleDeleteModal(true)
              handleDeletePostDetails({
                userProfileId: postedBy._id,
                deleteId: _id,
              })
            }}
          >
            <BsThreeDots
              size={18}
              className={`active:scale-75  active:opacity-75 transition-all flex space-x-[2px] items-center`}
            />
          </button>
        </div>
      </div>
      <div>
        <Image
          src={imageUrl}
          width={384}
          height={0}
          alt={'post'}
          style={{ height: 'auto', width: '584px', aspectRatio: '1' }}
          onLoad={() => {
            setLoadingImage(true)
          }}
          className={`object-cover rounded-[5px] md:w-[584px] md:h-[584px] border-2 border-[#171717]
          ${!loadingImage ? 'animate-pulse rounded-md bg-neutral-700' : ''}`}
          priority={false}
          unoptimized={loadingImage}
        />
      </div>
      <div>
        {authUser ? (
          <div className='px-[13px] gap-[15px] md:h-[60px] h-[45px]  w-full flex items-center justify-between mt-[3px]'>
            <div className='flex gap-[15px] items-center'>
              <button
                onClick={() => {
                  setIsLiked(prev => !prev)
                  if (!isLiked) {
                    likePost(
                      _id,
                      index,
                      setNumberOfLikes,
                      numberOfLikes,
                      isLiked,
                      setIsLiked,
                      authUser,
                      serverRenderedPost
                    )
                  } else {
                    unlikePost(
                      _id,
                      index,
                      setNumberOfLikes,
                      numberOfLikes,
                      isLiked,
                      setIsLiked,
                      authUser,
                      serverRenderedPost
                    )
                  }
                }}
                className='hover:scale-105'
              >
                {isLiked ? (
                  <Image
                    src={`/assets/filledHeart.svg`}
                    width={30}
                    height={30}
                    alt='user jpg'
                    className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 transition-all'
                    priority
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                  />
                ) : (
                  <Image
                    src={`/assets/heart.svg`}
                    width={30}
                    height={30}
                    alt='user jpg'
                    className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 transition-all'
                    priority
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                  />
                )}
              </button>
              <Link href={`/post/${_id}`} scroll={false}>
                <Image
                  src={`/assets/comment.svg`}
                  width={30}
                  height={30}
                  alt='user jpg'
                  unoptimized
                  priority
                  className='rounded-full transition-all sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 '
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                />
              </Link>
            </div>
            <div>
              {isSaved ? (
                <button
                  onClick={() => {
                    setIsSaved(prev => !prev)
                    const data = unSavePost(_id, isSaved)
                    if (!data) {
                      setIsSaved(false)
                    }
                  }}
                >
                  <Image
                    src='/assets/bookmark-fill.svg'
                    width={30}
                    height={30}
                    priority
                    unoptimized
                    alt='bookmark icon'
                    className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 '
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                  />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsSaved(prev => !prev)
                    const data = savePost(_id, isSaved)
                    if (!data) {
                      setIsSaved(false)
                    }
                  }}
                >
                  <Image
                    src='/assets/bookmark.svg'
                    width={30}
                    height={30}
                    priority
                    unoptimized
                    alt='bookmark icon'
                    className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 fill-blue-500'
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                  />
                </button>
              )}
            </div>
          </div>
        ) : (
          <Skeleton className='m-[12px]   md:h-[40px] h-[25px] w-[40%]' />
        )}
        <div className='px-[15px] md:text-[14px] flex flex-col gap-[3px] text-[12px] font-semibold mb-[20px] '>
          <span className=''>{numberOfLikes} likes</span>
          {caption.length > 85 ? (
            showFullCaption ? (
              <pre className=' text-wrap font-poppins'>
                {caption}
                <button
                  className='text-neutral-500 mx-[10px] inline-block'
                  onClick={() => {
                    setShowFullCaption(prev => !prev)
                  }}
                >
                  less
                </button>
              </pre>
            ) : (
              <pre className=' text-wrap font-poppins'>
                {caption.slice(0, 85)}...
                <button
                  className='text-neutral-500 mx-[10px] inline-block'
                  onClick={() => {
                    setShowFullCaption(prev => !prev)
                  }}
                >
                  more
                </button>
              </pre>
            )
          ) : (
            <p>{caption}</p>
          )}
          {comments.length > 0 && (
            <Link href={`/post/${_id}`} scroll={false}>
              <p className='text-neutral-500 inline-block'>
                view all {comments.length} comments
              </p>
              {comments.length !== 0 && (
                <p className='text-neutral-200'>
                  {comments[0]?.postedBy?.username} {comments[0].commentText}
                </p>
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post
