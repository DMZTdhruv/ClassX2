import React from 'react'
import PostSection from './PostSection'
import SearchRightBar from '@/components/shared/SearchRightBar'
import { cookies } from 'next/headers'
import { Skeleton } from '@/components/ui/skeleton'
import { getPosts, getTotalPost } from './postActions'
import { jwtDecode } from 'jwt-decode'

export default async function HomeLayout() {
  const cookie = cookies().get('classX_user_token')?.value
  const postData = await getPosts(cookie || '', 1)
  const decodedValue = jwtDecode(cookie || '')
  const totalPost = await getTotalPost(cookie || '')
  if (!postData) {
    return (
      <div className='xl:w-[60%] mt-[80px] md:mt-[40px] w-full flex-1 px-[16px] flex gap-5 justify-center'>
        <div className='gap-5 flex flex-col'>
          <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
          <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
        </div>
      </div>
    )
  }

  return (
    <section className='flex w-full'>
      <PostSection postData={postData} totalPost={totalPost} cookie={cookie || ''} />
      {/*@ts-ignore  */}
      <SearchRightBar userProfileId={decodedValue?.userProfileId || ''} />
    </section>
  )
}
