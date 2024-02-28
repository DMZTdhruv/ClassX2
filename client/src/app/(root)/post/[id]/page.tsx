'use client'

import { Api } from '@/Constants'
import PagePostModal from '@/components/cards/PagePostModal'
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
  const [posts, setPosts] = useState(null)
  const cookie = useCookieProvider()

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`${Api}/post?postId=${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookie?.cookie}`,
          },
          cache: 'no-store',
        })

        if (!response.ok) {
          console.log('Failed to fetch the post')
          return
        }

        const { data } = await response.json()
        setPosts(data)
      } catch (err: any) {
        console.log(err.message)
      }
    }
    getPost()
  }, [])

  if (!posts) {
    return <div>Loading...</div>
  }

  return (
    <div
      className={`flexCenter  ${
        window.scrollY < 60 && 'translate-y-[-60px] sm:translate-y-[0px]'
      } top-0 sticky h-screen z-[1111110]`}
    >
      <PagePostModal postData={posts} postId={params.id} />
    </div>
  )
}
