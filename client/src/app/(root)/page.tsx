import React from 'react'
import PostSection from './PostSection'
import SearchRightBar from '@/components/shared/SearchRightBar'

export default function HomeLayout() {
  return (
    <section className='flex w-full'>
      <PostSection/>
      <SearchRightBar/>
    </section>
  )
}
