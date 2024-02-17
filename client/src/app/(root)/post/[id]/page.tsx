'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useState } from 'react'
import FollowButton from '@/components/shared/FollowButton/FollowButton'
import { type User, demoApi, type Comment } from '@/lib/demoApi'
import Link from 'next/link'
import useCookieProvider from '@/hooks/useCookieProvider'

const page = ({ params }: { params: { id: string } }) => {
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0)
  const cookie = useCookieProvider()
  const likePost = async () => {
    if (isLiked) return
    setNumberOfLikes(numberOfLikes + 1)
    const api = process.env.NEXT_PUBLIC_API
    // try {
    //   const response = await fetch(`${api}/post/like-post`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json',
    //       Authorization: `Bearer ${cookie?.cookie}`,
    //     },
    //     body: JSON.stringify({
    //       userProfileID: cookie?.userProfileId,
    //       postId: '',
    //     }),
    //   })

    //   if (!response.ok) {
    //     throw new Error('Error liking in post ')
    //   }

    //   const result = await response.json()
    // } catch (err) {
    //   console.log(err)
    // }
  }

  const unlikePost = async () => {
    if (!isLiked) return
    setNumberOfLikes(numberOfLikes - 1)
    const api = process.env.NEXT_PUBLIC_API
    // try {
    //   const response = await fetch(`${api}/post/unlike-post`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json',
    //       Authorization: `Bearer ${cookie?.cookie}`,
    //     },
    //     body: JSON.stringify({
    //       userProfileID: cookie?.userProfileId,
    //       postId: '',
    //     }),
    //   })

    //   if (!response.ok) {
    //     throw new Error('Error unliking the post ')
    //   }

    //   const result = await response.json()
    // } catch (err) {
    //   console.log(err)
    // }
  }

  const [isLiked, setIsLiked] = useState<boolean>(false)
  return (
    <section className='w-full flexCenter h-full '>
      <div className='md:w-[80%] border border-[#111] flex flex-col xl:flex-row'>
        <Image
          src={'/il.png'}
          alt=''
          width={400}
          height={300}
          style={{
            width: '100%',

            height: 'auto',
          }}
          className='xl:max-w-[400px]'
        />
        <div className='flex flex-col flex-1'>
          <header className='flex py-[18px] px-[15px] items-center'>
            <Image
              src={'/il.png'}
              alt=''
              width={30}
              height={30}
              style={{
                width: '30px',
                height: '30px',
              }}
              unoptimized
              className=' aspect-square object-cover rounded-full'
            />
            <div className='flex font-semibold pl-[15px]   '>
              <h5 className=''>yaeDhruv &nbsp;</h5>
              <span className=' text-white/50 '>- 1w</span>
              {/* <FollowButton
                _id='s'
                userToFollowId='s'
                classes='h-[30px] bg-transparent ml-[20px] hover:bg-transparent text-[#891DCC] hover:text-[#891DCC]/50 transition-all font-bold w-[60px]'
              /> */}
            </div>
          </header>
          <div className='flex-1 border-t border-b border-[#111] h-full w-full '>
            {demoApi.map((comment: Comment) => {
              return (
                <div
                  className='flex py-[12px] px-[15px] items-start'
                  key={comment.id}
                >
                  <Image
                    src={'/il.png'}
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
                  <div className='flex pl-[15px] justify-between items-start w-full '>
                    <div>
                      <p>
                        <span className='font-semibold text-[14px] lg:text-[15px]'>
                          {comment.postedBy.username} &nbsp;
                        </span>
                        <span className='text-[13px] lg:text-[15px]'>
                          {comment.commentText}
                        </span>
                      </p>
                      <div className='text-[12px] text-neutral-500 pt-[10px]'>
                        2d 799 likes reply
                      </div>
                    </div>
                    <Image
                      src={`/heart.svg`}
                      height={15}
                      width={15}
                      alt='heartLogo'
                      className=' ascpect-square'
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className='flex flex-col justify-center gap-[9px] border-b  border-[#111] p-[15px]'>
            <div className='flex items-center gap-[10px] '>
              <button
                onClick={() => {
                  setIsLiked(prev => !prev)
                  likePost()
                  unlikePost()
                }}
                className='hover:scale-105'
              >
                {isLiked ? (
                  <Image
                    src={`/bxs_heart.svg`}
                    width={25}
                    height={25}
                    alt='user jpg'
                    style={{
                      width: '25px',
                      height: '25px',
                    }}
                    className='rounded-full object-cover active:scale-90 transition-all'
                  />
                ) : (
                  <Image
                    src={`/heart.svg`}
                    width={25}
                    height={25}
                    alt='user jpg'
                    style={{
                      width: '25px',
                      height: '25px',
                    }}
                    className='rounded-full object-cover active:scale-90 transition-all'
                  />
                )}
              </button>
              <Link href={'/post/1'}>
                <Image
                  src={`/assets/comment.svg`}
                  width={25}
                  height={25}
                  alt='user jpg'
                  unoptimized
                  style={{
                    width: '25px',
                    height: '25px',
                  }}
                  className=' aspect-square object-cover translate-y-[-1px]'
                />
              </Link>
            </div>
            <p className='text-[13px]'>52,565 likes</p>
          </div>
          <div className='flex h-[80px] p-3 gap-3 relative'>
            <Input
              type='text'
              className='bg-[#171717] md:font-semibold h-full border-none rounded-xl'
              placeholder='Type your comment'
            />
            <button className='text-[#891DCC] bg-[#171717] absolute right-[30px] top-[50%] translate-y-[-50%] font-semibold rounded-[15px]'>
              Post
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page
