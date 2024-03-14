'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface IPostProps {
  _id: string
  imageUrl: string
  likes: number
  comments: number
}

export default function NormalPost({ _id, imageUrl, likes, comments }: IPostProps) {
  return (
    <div className='relative max-w-[300px]'>
      <Link href={`/post/${_id}?isProfile=true`} scroll={false}>
        <Image
          src={imageUrl}
          width={384}
          height={0}
          alt={'user-post'}
          style={{ height: 'auto', width: '300px', aspectRatio: '1' }}
          className='object-cover  md:w-[300px] md:h-[300px] border-2 border-[#171717] group-hover:opacity-70'
        />
      </Link>
      <div className='md:flex  gap-3 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0  group-hover:opacity-100'>
        <div className='flex items-center gap-1'>
          <Image
            src={'/assets/whiteFilledHeart.svg'}
            height={24}
            width={24}
            alt='likes'
            unoptimized
            className=''
          />
          <span>{likes}</span>
        </div>
        <div className='flex items-center gap-1'>
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
    </div>
  )
}
