import { getTotalSavedPost } from '@/app/(root)/postActions'
import InfiniteSavedFeed from '@/components/cards/InfiniteSavedFeed'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import React from 'react'

interface Token {
  userProfileId: string
}

const Page = async () => {
  const cookie = cookies().get('classX_user_token')?.value
  const { userProfileId }: Token = cookie
    ? jwtDecode(cookie || '')
    : { userProfileId: '' }
  const totalPosts: number = await getTotalSavedPost(cookie || '')
  return (
    <div>
      <InfiniteSavedFeed cookie={cookie || ''} totalPost={totalPosts} />
    </div>
  )
}

export default Page
