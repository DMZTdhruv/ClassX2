import UserHeader from '@/components/shared/UserHeader'
import NormalPost from '@/components/cards/NormalPost'
import { cookies } from 'next/headers'

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
  imageUrl: string
  likes: string[]
  comments: string[]
}

export default async function Profile() {
  const cookie = cookies()
  const token = cookie.get('classX_user_token')
  const api = process.env.NEXT_PUBLIC_API

  // functions
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
    } catch (err) {}
  }

  const getUserPosts = async () => {
    try {
      const response = await fetch(`${api}/users/get-user-posts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      })

      if (!response.ok) {
        console.log('There was an error')
      }

      const { data: result } = await response.json()
      return result[0].posts
    } catch (error) {
      console.log(error)
    }
  }

  // variables
  const userProfile: UserProfileProps = await getUserProfile()
  const userPosts: Ipost[] = await getUserPosts()
  console.log(userPosts)
  return (
    <section>
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

      {userPosts.length === 0 ? (
        <p>Post something</p>
      ) : (
        userPosts?.map(user => {
          return (
            <NormalPost
              imageUrl={user.imageUrl}
              comments={user.comments.length}
              likes={user.likes.length}
            />
          )
        })
      )}
    </section>
  )
}
