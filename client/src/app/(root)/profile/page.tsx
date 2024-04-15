import UserHeader from '@/components/shared/UserHeader'
import { cookies } from 'next/headers'
import ProfilePosts from './ProfilePosts'
import Link from 'next/link'
import { getUserProfile } from './ProfileAction'
import { redirect } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

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

interface Ipost {
  _id: string
  imageUrl: string
  likes: string[]
  comments: string[]
}
interface Token {
  userProfileId: string
}

export default async function Profile() {
  const cookie = cookies()
  const token = cookie.get('classX_user_token')
  const { userProfileId }: Token = token
    ? jwtDecode(token?.value || '')
    : { userProfileId: '' }

  redirect(`/profile/${userProfileId}`)
  return null
}
