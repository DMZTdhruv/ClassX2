import React from 'react'
import Post from '@/components/cards/Post'

function Home() {
  return (
    <div className='w-full mt-[40px]  px-[16px] flex flex-col gap-5 items-center'>
      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default Home

const getPostDetails = () => {}
