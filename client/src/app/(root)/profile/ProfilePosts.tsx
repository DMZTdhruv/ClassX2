import { Api } from '@/Constants'
import NormalPost from '@/components/cards/NormalPost'
import { Skeleton } from '@/components/ui/skeleton'

interface Posts {
  _id: string
  imageUrl: string
  comments: string[]
  likes: string[]
}

const ProfilePosts = async ({
  userProfileId,
  token,
}: {
  token: string
  userProfileId: string
}) => {
  const getUserPosts = async () => {
    try {
      const response = await fetch(`${Api}/users/get-user-posts`, {
        method: 'GET',
        headers: {
          Cookies: `classX_user_token=${token}`,
        },
        next: {
          tags: ['userPost'],
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
  const userPosts = await getUserPosts()

  if (!userPosts) {
    return (
      <div className='grid grid-cols-3 sm:px-[16px] relative gap-[4px] md:gap-[8px] '>
        <Skeleton className='h-auto min-h-[300px] w-[300px] rounded-xl' />
        <Skeleton className='h-auto min-h-[300px] w-[300px] rounded-xl' />
        <Skeleton className='h-auto min-h-[300px] w-[300px] rounded-xl' />
      </div>
    )
  }

  return (
    <div className='grid grid-cols-3 sm:px-[16px] relative gap-[4px] md:gap-[8px] '>
      {userPosts &&
        (userPosts?.length === 0 ? (
          <p className='text-center absolute w-[200px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            Post something
          </p>
        ) : (
          userPosts?.map((post: Posts) => {
            return (
              <NormalPost
                key={post._id}
                _id={post._id}
                imageUrl={post.imageUrl}
                comments={post.comments.length}
                likes={post.likes.length}
              />
            )
          })
        ))}
    </div>
  )
}

export default ProfilePosts
