'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UploadAttachments } from '@/Constants'

interface IPostProps {
  _id: string
  attachments: UploadAttachments[]
  likes?: number
  comments?: number
}

export default function NormalPost({ _id, attachments, likes, comments }: IPostProps) {
  const [loadingImage, setLoadingImage] = useState<boolean>(false)
  return (
    <div className='relative animate-in fade-in-0 aspect-square max-h-[300px] max-w-[300px]'>
      <Link href={`/post/${_id}?isProfile=true`} scroll={false}>
        {attachments[0].extension === 'mp4' ? (
          <video
            autoPlay={false}
            loop={false}
            height={300}
            muted
            src={attachments?.[0]?.url}
            className={`md:max-w-[300px] md:max-h-[300px] aspect-square object-cover border-2 border-[#171717] group-hover:opacity-70`}
          ></video>
        ) : (
          <Image
            src={attachments?.[0]?.url}
            width={384}
            height={0}
            onLoad={() => setLoadingImage(true)}
            alt={'user-post'}
            style={{ height: 'auto', width: '300px', aspectRatio: '1' }}
            className={`object-cover  
            ${!loadingImage ? 'animate-pulse rounded-md bg-neutral-700' : ''}
            md:w-[300px] md:h-[300px] border-2 border-[#171717] group-hover:opacity-70`}
          />
        )}
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
