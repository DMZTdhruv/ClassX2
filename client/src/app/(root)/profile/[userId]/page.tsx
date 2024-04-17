import React from 'react'
import ProfilePosts from '../ProfilePosts'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { Api } from '@/Constants'

interface Token {
  userProfileId: string
}

interface UserProfileProps {
  _id: string
  name: string
  username: string
  about: string
  userProfileImage: string
  isPrivate: boolean
  following: any[]
  followers: any[]
  posts: string[]
}

const Page = async ({ params }: { params: { userId: string } }) => {
  const cookie = cookies()
  const token = cookie.get('classX_user_token')
  const { userProfileId }: Token = token
    ? jwtDecode(token?.value || '')
    : { userProfileId: '' }

  if(!cookie) {
    
  }

  const getUserProfile = async () => {
    const userProfileApi = `${Api}/users?userId=${params.userId}`
    try {
      const response = await fetch(userProfileApi, {
        method: 'GET',
        headers: {
          Cookies: `classX_user_token=${token?.value}`,
        },
      })

      const data = await response.json()
      if (data.error) {
        console.log('Failed to fetch the user')
      }

      return data.data
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const userProfile: UserProfileProps = await getUserProfile()
  return (
    <div>
      <ProfilePosts
        userProfileId={userProfile?._id}
        token={token?.value || ''}
        isDifferentUser={params.userId !== userProfileId}
        totalPosts={userProfile?.posts.length}
      />
    </div>
  )
}

export default Page
