import React from 'react'
import Image from 'next/image'

interface IPostProps {
  imageUrl: string
  likes: number
  comments: number
}

export default function NormalPost({ imageUrl, likes, comments }: IPostProps) {
  return (
    <div className='realtive'>
      <Image
        src={imageUrl}
        alt='User-post'
        height={300}
        width={300}
        unoptimized
      />
      <div className='flex'>
        <div>
          <Image
            src={'/heart.svg'}
            height={24}
            width={24}
            alt='likes'
            unoptimized
          />
          <span>{likes}</span>
        </div>
        <Image
          src={'/assets/comment.svg'}
          height={24}
          width={24}
          alt='likes'
          unoptimized
        />
        <span>{comments}</span>
      </div>
    </div>
  )
}
