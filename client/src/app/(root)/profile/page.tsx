import UserHeader from '@/components/shared/UserHeader'
import { cookies } from 'next/headers'
import ProfilePosts from './ProfilePosts'
import Link from 'next/link'
import { getUserProfile } from './ProfileAction'

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

export default async function Profile() {
  const cookie = cookies()
  const token = cookie.get('classX_user_token')
  let error = undefined

  // variables
  const userProfile: UserProfileProps = await getUserProfile(token?.value || '')
  console.log(userProfile)
  if (error) {
    return (
      <div className='h-screen w-full flexCenter text-center'>
        {error} <br />
        <Link href='/auth/sign-in'>Sign in</Link>
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
        posts={userProfile?.posts}
        followers={userProfile?.followers}
        following={userProfile?.following}
        isPrivate={userProfile?.isPrivate}
      />
      <ProfilePosts
        userProfileId={userProfile?._id}
        token={token?.value || ''}
        totalPosts={userProfile?.posts.length}
      />
    </section>
  )
}
