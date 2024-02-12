'use client'

import { Input } from '@/components/ui/input';
import React, { ChangeEvent, useState } from 'react'

export default function index() {
  const [userName,setUserName] = useState<string>("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }
  return (
    <div>
     <Input 
      type='text'
      placeholder='Enter username'
      onChange={handleSearch}
      value={userName}
     />
    </div>
  )
}
