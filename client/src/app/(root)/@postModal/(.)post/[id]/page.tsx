import React, { Suspense } from 'react'
import { cookies } from 'next/headers'
import { Api } from '@/Constants'
import { jwtDecode } from 'jwt-decode'
const PostModalPage = React.lazy(
  () => import('@/components/cards/PostModalPage')
)

export default async function PostModal({
  params,
}: {
  params: { id: string }
}) {
  const cookie = cookies()
  const token = cookie.get('classX_user_token')

  const getPost = async () => {
    try {
      const response = await fetch(`${Api}/post?postId=${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        cache: 'no-cache',
      })

      if (!response.ok) {
        console.log('Failed to fetch the post')
      }

      const { data } = await response.json()
      return data
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const postData = await getPost()

  function LoadingSkeleton() {
    return (
      <div className='fixed top-[50%] left-[50%] flex items-center gap-3 translate-x-[-50%] translate-y-[-50%]'>
        Loading... <div className='loader '></div>
      </div>
    )
  }

  return (
    <div className='fixed z-[10000] top-[50%] left-[50%] flexCenter translate-x-[-50%] h-[100vh] overflow-hidden bg-neutral-900/90 translate-y-[-50%] w-full'>
      <Suspense fallback={<LoadingSkeleton />}>
        <div className=' w-full flexCenter'>
          {postData && <PostModalPage postData={postData} postId={params.id} />}
        </div>
      </Suspense>
    </div>
  )
}
