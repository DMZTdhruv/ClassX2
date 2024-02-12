'use client'

import React, { useEffect, useState } from 'react'
import useCookieProvider from '@/hooks/useCookieProvider'

interface SuggestedUsers {
  _id: string,
  name: string
  username: string
  userProfileImage: string
}

export default function index({children}: {children: React.ReactNode}) {
  const [suggestedUsers,setSuggestedUsers] = useState<SuggestedUsers[]>([])
  const cookie = useCookieProvider();
  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API;
    const getUsers = async () => {
      try {
        const response = await fetch(`${api}/users/users-of-division`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookie?.cookie}`
          }
        })

        if(!response.ok) {
          throw new Error("Failed to fetch users")
        }

        const {data} = await response.json();
        setSuggestedUsers(data);
      } catch (err: any) {
        console.log(err.message)
      }
    }
    getUsers()
  }, [])


  return (
    <div>{children}</div>
  )
}
