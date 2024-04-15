import SearchUser from '@/components/shared/SearchUser'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import {  getTotalPost } from '../postActions'
import InfiniteExploreFeed from '@/components/cards/InfiniteExploreFeed'

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
  const totalPosts: number = await getTotalPost(cookie || '')

  return (
    <section className=' md:mt-[40px] flex justify-center  pb-[50px] w-full '>
      <div className='lg:w-[80%] w-full  flex flex-col items-center '>
        <div className='md:m-[20px] my-[10px] px-[10px] md:px-[0] w-full'>
          <SearchUser userId={userProfileId} />
        </div>
        <InfiniteExploreFeed cookie={cookie || ''} totalPost={totalPosts} />
      </div>
    </section>
  )
}
