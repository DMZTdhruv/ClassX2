'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { formatDate } from '@/utils'
import Link from 'next/link'
import { IPost } from '@/Constants'
import { likePost, unlikePost } from '@/utils/LikeFunctions'
import { BsThreeDots } from 'react-icons/bs'
import { useAuthContext } from '@/context/AuthContext'
import { Skeleton } from '../ui/skeleton'

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
  handleDeletePostDetails,
  handleDeleteModal,
}) => {
  const date = new Date(createdAt)

  //@ts-ignore
  const { authUser } = useAuthContext()

  const [numberOfLikes, setNumberOfLikes] = useState<number>(likes.length)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [showFullCaption, setShowFullCaption] = useState<boolean>(false)

  useEffect(() => {
    setIsLiked(likes.filter(id => id === authUser?.userProfileId).length > 0)
  }, [authUser])

  return (
    <div className='w-full animate-in fade-in-0 lg:w-[584px] h-auto rounded-xl border-b-2 border-[#171717] font-poppins  postSection'>
      <div className='h-[60px] px-[16px] flex items-center justify-between text-[14px]'>
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
              <Link
                href={`/profile/${postedBy._id}`}
                className='flex items-center gap-3'
              >
                {postedBy?.username}{' '}
                <span className=' h-1 w-1 bg-neutral-600 rounded-full'></span>
              </Link>
              <span
                className='text-neutral-500 text-[13px]'
                suppressHydrationWarning={true}
              >
                {formatDate(date)} ago
              </span>
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
          className='object-cover  md:w-[584px] md:h-[584px] border-2 border-[#171717]'
          quality={100}
          unoptimized
        />
      </div>
      <div>
        {authUser ? (
          <div className='px-[12px] gap-[15px] md:h-[60px] h-[45px]  w-full flex items-center mt-[3px]'>
            <button
              onClick={() => {
                setIsLiked(prev => !prev)
                likePost({
                  _id,
                  isLiked,
                  setNumberOfLikes,
                  setIsLiked,
                  numberOfLikes,
                  authUser,
                  endPoint: 'post/like-post',
                })
                unlikePost({
                  _id,
                  isLiked,
                  setNumberOfLikes,
                  setIsLiked,
                  numberOfLikes,
                  authUser,
                  endPoint: 'post/unlike-post',
                })
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
        ) : (
          <Skeleton className='m-[12px]   md:h-[40px] h-[25px] w-[40%]' />
        )}
        <div className='px-[15px] md:text-[14px] flex flex-col gap-[3px] text-[12px] font-semibold mb-[20px] '>
          <span>{numberOfLikes} likes</span>
          {caption.length > 85 ? (
            showFullCaption ? (
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
