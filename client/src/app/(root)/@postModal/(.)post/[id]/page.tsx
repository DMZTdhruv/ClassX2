'use client'

import PostModalPage from '@/components/shared/PostModalPage'
import useCookieProvider from '@/hooks/useCookieProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiMiniXMark } from 'react-icons/hi2'

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

export default function PostModal({ params }: { params: { id: string } }) {
  const router = useRouter()
  const cookie = useCookieProvider()
  const api = process.env.NEXT_PUBLIC_API
  const [postData, setPostData] = useState<IPost>()
  const getPost = async () => {
    try {
      const response = await fetch(`${api}/post?postId=${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookie?.cookie}`,
        },
        cache: 'no-cache',
      })

      if (!response.ok) {
        console.log('Failed to fetch the post')
        return
      }

      const { data } = await response.json()
      setPostData(data)
      return data
    } catch (err: any) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  if (!postData) {
    return <>Loading...</>
  }

  const goBack = () => {
    router.back()
  }

  return (
    <div className='fixed top-[50%] left-[50%] translate-x-[-50%] h-[100vh] bg-neutral-900/90 translate-y-[-50%] w-full'>
      <button onClick={goBack}>
        <HiMiniXMark className='fixed top-[5%] right-[5%]' size={30} />
      </button>
      <PostModalPage postData={postData} postId={params.id} />
    </div>
  )
}
