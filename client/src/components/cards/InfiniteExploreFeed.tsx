'use client'
import { IPost } from '@/Constants'
import { getPosts } from '@/app/(root)/postActions'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import NormalPost from './NormalPost'
import { usePostContext } from '@/context/PostContext'
import Link from 'next/link'

const InfiniteExploreFeed = ({
  cookie,
  totalPost,
}: {
  cookie: string
  totalPost: number
}) => {
  const { setExplorePost, explorePost, userPost } = usePostContext()
  const { ref, inView } = useInView()
  const [page, setPage] = useState<number>(0)
  const [allPostLoaded, setAllPostLoaded] = useState<boolean>(false)
  const [error, setError] = useState<{ error: string }>({ error: '' })

  const loadMorePosts = async () => {
    const nextPage = page + 1
    const newPosts: IPost[] = await getPosts(cookie, nextPage)
    // @ts-ignore
    if (newPosts?.error) {
      // @ts-ignore
      setError(newPosts?.error)
      return
    }
    setExplorePost(prev => [...prev, ...newPosts])
    setPage(nextPage)
  }
  if (error) {
    return (
      <div className='xl:w-[60%] h-[100vh]  w-full flex-1 px-[16px] flex gap-5 justify-center'>
        <div className='flex items-center justify-center flex-col'>
          {/* @ts-ignore  */}
          {error.error}
          <Link href={`/auth/sign-in`} className='text-primary hover:underline'>
            Sign in
          </Link>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (inView) {
      if (explorePost.length >= totalPost) {
        setAllPostLoaded(true)
        return
      }
      loadMorePosts()
    }
  }, [inView, page])

  return (
    <>
      <div className=' p-[1px]  grid grid-cols-3 max-w-[904px] gap-[1px]  '>
        {explorePost?.map(posts => {
          return (
            <NormalPost
              key={posts._id}
              _id={posts._id}
              imageUrl={posts.imageUrl}
              likes={posts.likes.length}
              comments={posts.comments.length}
            />
          )
        })}
      </div>
      <div className='w-full flex justify-center'>
        {allPostLoaded ? (
          <p className='my-5'>You are up-to-date</p>
        ) : (
          <div className='loader my-5' ref={ref}></div>
        )}
      </div>
    </>
  )
}

export default InfiniteExploreFeed
