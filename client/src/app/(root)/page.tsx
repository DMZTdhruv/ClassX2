import React from 'react'
import PostSection from './PostSection'
import SearchRightBar from '@/components/shared/SearchRightBar'
import { cookies } from 'next/headers'
import { Api } from '@/Constants'
import { Skeleton } from '@/components/ui/skeleton'

export default async function HomeLayout() {
  const cookie = cookies().get('classX_user_token')
  const getPosts = async () => {
    try {
      const response = await fetch(`${Api}/post/get-post?page=${1}&limit=${10}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookie?.value}`,
        },
        cache: 'no-store',
        next: {
          tags: ['feedPost'],
        },
      })

      if (!response.ok) {
        throw new Error('Failed to get the data')
      }

      const { data } = await response.json()
      return data
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const postData = await getPosts()
  if (!postData) {
    return (
      <div className='xl:w-[60%] mt-[80px] md:mt-[40px] w-full flex-1 px-[16px] flex gap-5 justify-center'>
        <div className='gap-5 flex flex-col'>
          <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
          <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
        </div>
        <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
      </div>
    )
  }

  return (
    <section className='flex w-full'>
      <PostSection postData={postData} />
      <SearchRightBar />
    </section>
  )
}
