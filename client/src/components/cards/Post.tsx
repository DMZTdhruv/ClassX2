import React from 'react'
import Image from 'next/image'

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

  if(comments.length !== 0 ) {
    console.log(comments)
  }

  return (
    <div className='w-full md:w-[584px] h-auto rounded-xl  bg-[#171717] postSection'>
      <div className='h-[60px] px-[16px] flex items-center'>
        <div className='flex items-center gap-[11px]'>
          <Image
            src={postedBy?.userProfileImage}
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
          <div className='flex font-semibold'>
            <p>yaeMiko - </p>
            <span className='text-neutral-500'> 1w</span>
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
          unoptimized
        />
      </div>
      <div>
        <div className='px-[15px] gap-[15px] md:h-[60px] h-[45px]  w-full flex items-center mt-[3px]'>
          <Image
            src={`/assets/heart.svg`}
            width={23}
            height={23}
            alt='user jpg'
            unoptimized
            className='rounded-full object-cover '
            style={{
              width: '23px',
              height: '23px',
            }}
          />
          <Image
            src={`/assets/comment.svg`}
            width={23}
            height={23}
            alt='user jpg'
            unoptimized
            className='rounded-full object-cover '
            style={{
              width: '23px',
              height: '23px',
            }}
          />
        </div>
        <div className='px-[15px] md:text-[15px] flex flex-col gap-[3px] text-[13px] font-semibold mb-[20px] '>
          <span>{likes} likes</span>
          <p>{caption}</p>
          <p className='text-neutral-500'>view all {comments.length} comments</p>
          {comments.length !== 0 && (
            <p className='text-neutral-200'>
              {comments[0]?.postedBy?.username}{" "}
              {comments[0].commentText}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post
