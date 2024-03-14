import UserHeader from '@/components/shared/UserHeader'
import React from 'react'
import ProfilePosts from '../ProfilePosts'
import { cookies } from 'next/headers'
import { Api } from '@/Constants'

interface UserProfileProps {
  _id: string
  name: string
  username: string
  about: string
  userProfileImage: string
  isPrivate: boolean
  following: any[]
  followers: any[]
  post: string[]
}

const ProfilePage = async ({ params }: { params: { userId: string } }) => {
  const cookie = cookies()
  const token = cookie.get('classX_user_token')
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
    <section className='flex mt-[80px]  md:mt-[0px] sm:px-[16px] flex-col items-center gap-[60px] mb-[20px]'>
      <UserHeader
        _id={userProfile?._id}
        name={userProfile?.name}
        username={userProfile?.username}
        about={userProfile?.about}
        userProfileImage={userProfile?.userProfileImage}
        post={userProfile?.post}
        followers={userProfile?.followers}
        following={userProfile?.following}
        isPrivate={userProfile?.isPrivate}
      />
      <ProfilePosts userProfileId={userProfile?._id} token={token?.value || ''} />
    </section>
  )
}

export default ProfilePage
