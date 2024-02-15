import React from 'react'
import PostSection from './PostSection'
import SearchRightBar from '@/components/shared/SearchRightBar'

export default async function HomeLayout() {
  
  return (
    <section className='flex w-full'>
      <PostSection />
      <SearchRightBar />
    </section>
  )
}
