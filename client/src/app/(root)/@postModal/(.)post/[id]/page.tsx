'use client'

import React, {
  ChangeEvent,
  MouseEventHandler,
  Suspense,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { HiMiniXMark } from 'react-icons/hi2'
import useCookieProvider from '@/hooks/useCookieProvider'
const LazyPostModalPage = React.lazy(
  () => import('@/components/shared/PostModalPage')
)

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
  const modalRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const [postData, setPostData] = useState<IPost>()
  const cookie = useCookieProvider()
  const api = process.env.NEXT_PUBLIC_API

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
        return Promise.reject('Failed to fetch the post')
      }

      const { data } = await response.json()
      setPostData(data)
      return data
    } catch (err: any) {
      console.log(err.message)
      return Promise.reject(err.message)
    }
  }

  const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, right, top, bottom } =
      modalRef.current?.getBoundingClientRect()!
    const { clientX, clientY } = event
    if (
      clientX < left ||
      clientX > right ||
      clientY < top ||
      clientY > bottom
    ) {
      router.back()
    }
  }

  useEffect(() => {
    getPost()

    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'hidden'
    return () => {
      body.style.overflow = 'auto'
    }
  }, [])

  const goBack = () => {
    router.back()
  }

  function LoadingSkeleton() {
    return <div>Loading...</div>
  }

  return (
    <div
      className='fixed z-[100] top-[50%] left-[50%] flexCenter translate-x-[-50%] h-[100vh] overflow-hidden bg-neutral-900/90 translate-y-[-50%] w-full'
      onClick={closeModal}
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <button>
          <HiMiniXMark className='fixed top-[5%] right-[5%]' size={30} />
        </button>
        <div className='w-[80%] flexCenter h-auto ' ref={modalRef}>
          {postData && (
            <LazyPostModalPage postData={postData} postId={params.id} />
          )}
        </div>
      </Suspense>
    </div>
  )
}
