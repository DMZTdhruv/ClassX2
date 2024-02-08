import React from 'react'
import Image from 'next/image'

const Post = () => {
  return (
    <div className='w-full md:w-[584px] h-auto bg-[#171717]  rounded-[10px]'>
      <div className='h-[60px] px-[16px] flex items-center'>
        <div className='flex items-center gap-[11px]'>
          <Image
            src={`/assets/user.jpg`}
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
          src={`/post.jpg`}
          width={384}
          height={0}
          alt={'post'}
          style={{ height: 'auto', width: '584px', aspectRatio: "1" }}
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
          <span>52,052 likes</span>
          <p>What do you guys think about this ai art which I made?</p>
          <p className='text-neutral-500'>140 comments</p>
        </div>
      </div>
    </div>
  )
}

export default Post
