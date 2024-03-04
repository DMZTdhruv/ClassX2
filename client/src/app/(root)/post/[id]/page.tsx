'use client'

import PagePostModal from '@/components/cards/PagePostModal'
import { useEffect, useState } from 'react'
import useGetPost from '@/hooks/posts/useGetPost'

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
  const [postData, setPostData] = useState<IPost | null>(null)
  const { loading, getPost, errorMessage } = useGetPost()

  const setPost = (data: IPost) => {
    setPostData(data)
  }

  useEffect(() => {
    getPost(params.id, setPost)
  }, [])

  if (errorMessage) {
    return (
      <div className='flex-1 w-full h-screen flexCenter font-bold bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-transparent text-[23px]'>
        {errorMessage}
      </div>
    )
  }

  if (!postData) {
    return <div>Loading...</div>
  }

  return (
    <div
      className={`flexCenter  ${
        window.scrollY < 60 && 'translate-y-[-60px] sm:translate-y-[0px]'
      } top-0 sticky h-screen z-[1111110]`}
    >
      {/* @ts-ignore */}
      <PagePostModal postData={postData} postId={params.id} />
    </div>
  )
}
