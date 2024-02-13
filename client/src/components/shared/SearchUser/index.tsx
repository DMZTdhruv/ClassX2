'use client'

import { Input } from '@/components/ui/input'
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'

export default function index() {
  const [userName, setUserName] = useState<string>('')
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }
  return (
    <div className='w-full relative flex justify-center'>
      <Input
        type='text'
        placeholder='Enter username'
        onChange={handleSearch}
        className=' rounded-full w-[90%] h-[40px] bg-[#171717] pr-[50px]'
        value={userName}
      />
      <Image
        src={`/assets/iconamoon_search-bold.svg`}
        width={50}
        height={0}
        style={{
          width: '50px',
          height: 'auto',
        }}
        alt='searchicon'
        className='rounded-r-[15px] absolute right-[6%] top-[50%] translate-y-[-50%] h-[100%] px-[15px]'
      />
    </div>
  )
}
