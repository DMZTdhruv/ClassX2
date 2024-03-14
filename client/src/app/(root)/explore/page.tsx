import SearchUser from '@/components/shared/SearchUser'
import { cookies } from 'next/headers'
import NormalPost from '@/components/cards/NormalPost'
import { jwtDecode } from 'jwt-decode'
import { getPosts } from '../postActions'

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
  comments: any[]
  createdAt: string
}

interface Token {
  userProfileId: string
}
export default async function Search() {
  const cookie = cookies().get('classX_user_token')?.value
  const { userProfileId }: Token = cookie
    ? jwtDecode(cookie || '')
    : { userProfileId: '' }
  const postData = await getPosts(cookie || '')
  return (
    <section className=' md:mt-[40px] flex justify-center  pb-[50px] w-full '>
      <div className='lg:w-[80%] w-full  flex flex-col items-center '>
        <div className='md:m-[20px] my-[10px] px-[10px] md:px-[0] w-full'>
          <SearchUser userId={userProfileId} />
        </div>
        <div className=' md:mt-[50px] p-[1px]  grid grid-cols-3 max-w-[904px] gap-[1px]  '>
          {postData?.map((posts: IPost) => {
            return (
              <NormalPost
                key={posts._id}
                _id={posts._id}
                imageUrl={posts.imageUrl}
                likes={posts.likes.length}
                comments={posts.comments.length}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
