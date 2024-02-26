import { Api } from '@/Constants'
import PagePostModal from '@/components/cards/PagePostModal'
import { cookies } from 'next/headers'

interface IComments {
  _id: string
  commentText: string
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  createdAt: string
  likes: string[]
  commentReplies: string[]
}

interface IPost {
  _id: string
  title: string
  imageUrl: string
  caption: string
  location: string
  category: string
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  likes: any[]
  comments: IComments[]
  createdAt: string
}

export default async function PostModal({
  params,
}: {
  params: { id: string }
}) {
  const cookie = cookies()
  const token = cookie.get('classX_user_token')
  const posts = await getPost(params.id, token?.value!)

  if (!posts) {
    return <div>Loading...</div>
  }

  return (
    <div className='flexCenter min-h-screen w-full'>
      <PagePostModal />
    </div>
  )
}

const getPost = async (id: string, cookie: string) => {
  try {
    const response = await fetch(`${Api}/post?postId=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.log('Failed to fetch the post')
      return
    }

    const { data } = await response.json()
    return data
  } catch (err: any) {
    console.log(err.message)
  }
}
