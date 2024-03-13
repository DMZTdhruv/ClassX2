'use client'

import React, { Suspense } from 'react'
import { IPost } from '@/Constants'
const PostModalPage = React.lazy(() => import('@/components/cards/PostModalPage'))
import { useEffect, useState } from 'react'
import useGetPost from '@/hooks/posts/useGetPost'
import { usePathname, useRouter } from 'next/navigation'

export default function PostModal({ params }: { params: { id: string } }) {
  const pathname = usePathname()
  const router = useRouter()
  if (pathname.startsWith('/profile')) {
    router.refresh()
  }
  const [postData, setPostData] = useState<IPost | null>(null)
  const { loading, getPost } = useGetPost()

  const setPost = (data: IPost) => {
    setPostData(data)
  }

  useEffect(() => {
    getPost(params.id, setPost)
  }, [])

  function LoadingSkeleton() {
    return (
      <div className='fixed top-[50%] left-[50%] flex items-center gap-3 translate-x-[-50%] translate-y-[-50%]'>
        Loading... <div className='loader'></div>
      </div>
    )
  }

  return (
    <div className='fixed z-[10000] top-[50%] left-[50%] flexCenter translate-x-[-50%] h-[100vh] overflow-hidden bg-neutral-900/90 translate-y-[-50%] w-full'>
      <Suspense fallback={<LoadingSkeleton />}>
        <div className=' w-full flexCenter'>
          {!loading && postData && (
            <PostModalPage postData={postData} postId={params.id} />
          )}
        </div>
      </Suspense>
    </div>
  )
}
