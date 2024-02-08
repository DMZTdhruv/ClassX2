import React from 'react'
import Post from '@/components/cards/Post'

function Home() {
  return (
    <div className='w-full mt-[50px] flex flex-col gap-5 items-center'>
      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default Home
