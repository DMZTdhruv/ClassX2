'use client'

import PostModalPage from './PostModalPage'
import useCookieProvider from '@/hooks/useCookieProvider'
import { useEffect, useState } from 'react'

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

  return <PostModalPage postData={postData} postId={params.id} />
}
