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
  let error = undefined
  const getUserProfile = async () => {
    const userProfileApi = `${api}/users/get-user-profile`
    try {
      const response = await fetch(userProfileApi, {
        method: 'GET',
        headers: {
          Cookies: `classX_user_token=${token?.value}`,
        },
      })

      const data = await response.json()
      console.log(data)
      if (data.error) {
        throw new Error(data.error)
      }

      return data.data
    } catch (err: any) {
      error = err.message
      console.log(err.message)
    }
  }

  // variables
  const userProfile: UserProfileProps = await getUserProfile()
  if (error) {
    return (
      <div className='h-screen w-full flexCenter text-center'>
        {error} <br /> Log in
      </div>
    )
  }
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
