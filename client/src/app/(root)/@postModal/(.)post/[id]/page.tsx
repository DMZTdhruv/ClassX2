'use client'

import React, { Suspense } from 'react'
import { Api, IPost } from '@/Constants'
const PostModalPage = React.lazy(
  () => import('@/components/cards/PostModalPage')
)
import { useEffect, useState } from 'react'
import useCookieProvider from '@/hooks/useCookieProvider'

export const dynamic = 'force-dynamic'
export default function PostModal({ params }: { params: { id: string } }) {
  const cookies = useCookieProvider()
  const [postData, setPostData] = useState<IPost | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    getPost()
  }, [])

  const getPost = async () => {
    try {
      const response = await fetch(`${Api}/post?postId=${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies?.cookie}`,
        },
        cache: 'no-store',
      })

      if (!response.ok) {
        console.log('Failed to fetch the post')
      }

      const { data } = await response.json()
      setPostData(data)
    } catch (err: any) {
      console.log(err.message)
    } finally {
      setIsLoading(false)
    }
  }

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
          {!isLoading && postData && (
            <PostModalPage
              postData={postData}
              postId={params.id}
            />
          )}
        </div>
      </Suspense>
    </div>
  )
}
