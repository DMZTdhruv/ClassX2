'use client'

import Post from '@/components/cards/Post'
import { Skeleton } from '@/components/ui/skeleton'
import useCookieProvider from '@/hooks/useCookieProvider'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Api } from '@/Constants'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import DeleteComponent from '@/components/shared/DeleteComponent/DeleteComment'

interface IComments {
  _id: string
  commentText: string
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  createdAt: string
  likes: string[]
  commentReplies: string[]
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
  likes: any[]
  comments: IComments[]
  createdAt: string
}

export default function PostSection() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const cookie = useCookieProvider()

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true)
      try {
        const { data } = await axios.get(`${Api}/post/get-post?page=${1}&limit=${10}`, {
          headers: {
            Authorization: `Bearer ${cookie?.cookie}`,
          },
        })
        const { data: result } = data
        setPosts(result)
      } catch (error: any) {
        const { message } = error.response.data
        if (error.response.status === 401) {
          setErrorMessage('Unauthorized please sign in')
          return
        }
        setErrorMessage(message)
        console.error(message)
      } finally {
        setIsLoading(false)
      }
    }
    getPosts()
  }, [])

  if (errorMessage) {
    return (
      <div className='xl:w-[60%]  w-full  justify-center h-screen flex flex-col gap-5 items-center'>
        {errorMessage}
        <Button className='text-white'>
          <Link href='/auth/sign-in'>Sign in</Link>
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='xl:w-[60%]  w-full mt-[40px]  px-[16px] flex flex-col gap-5 items-center'>
        <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
        <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
      </div>
    )
  }

  return (
    <div
      className={`xl:w-[60%] mt-[80px] w-full sm:px-[16px] sm:mt-[40px]  px-[16px] flex flex-col gap-5 items-center`}
    >
      {posts?.map(post => {
        return (
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            imageUrl={post.imageUrl}
            caption={post.caption}
            location={post.location}
            category={post.category}
            postedBy={post.postedBy}
            likes={post.likes}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        )
      })}
    </div>
  )
}
