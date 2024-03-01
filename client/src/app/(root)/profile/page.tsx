import UserHeader from '@/components/shared/UserHeader'
import { cookies } from 'next/headers'
import ProfilePosts from './ProfilePosts'

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

interface Ipost {
  _id: string
  imageUrl: string
  likes: string[]
  comments: string[]
}

export default async function Profile() {
  const cookie = cookies()
  const api = process.env.NEXT_PUBLIC_API
  const token = cookie.get('classX_user_token')
  const getUserProfile = async () => {
    const userProfileApi = `${api}/users/get-user-profile`
    try {
      const response = await fetch(userProfileApi, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      })

      if (!response.ok) {
        console.log('Failed to fetch the user')
      }

      const { message: result } = await response.json()
      return result
    } catch (error: any) {
      console.log(error.message)
    }
  }

  // variables
  const userProfile: UserProfileProps = await getUserProfile()
  return (
    <section className='flex mt-[80px] sm:px-[16px] md:mt-[0px] sm:px-[16px] flex-col items-center gap-[60px] mb-[20px]'>
      <UserHeader
        _id={userProfile._id}
        name={userProfile.name}
        username={userProfile.username}
        about={userProfile.about}
        userProfileImage={userProfile.userProfileImage}
        post={userProfile.post}
        followers={userProfile.followers}
        following={userProfile.following}
        isPrivate={userProfile.isPrivate}
      />
      <ProfilePosts userProfileId={userProfile._id} token={token?.value || ''} />
    </section>
  )
}
