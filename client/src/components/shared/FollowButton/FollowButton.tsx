'use client'

import { Button } from '@/components/ui/button'
import useCookieProvider from '@/hooks/useCookieProvider'
import React, { useEffect, useState } from 'react'

interface FollowButtonProps {
  _id: string
  userToFollowId: string
}

export default function FollowButton({
  _id,
  userToFollowId,
}: FollowButtonProps) {
  const cookie = useCookieProvider()
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  const followObj = {
    userId: _id,
    userToFollowId: userToFollowId,
  }

  const handleFollow = async () => {
    if (isFollowing) return
    console.log('Is following')
    const api = process.env.NEXT_PUBLIC_API
    try {
      const response = await fetch(`${api}/users/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie?.cookie}`,
        },
        body: JSON.stringify(followObj),
      })

      if (!response.ok) {
        console.log('Failed to follow User')
        setIsFollowing(false)
      }

      const result = await response.json()
      console.log(result)
    } catch (err: any) {
      setIsFollowing(false)
      console.log(err.message)
    }
  }

  const handleUnfollow = async () => {
    if (!isFollowing) return
    console.log('Unfollwed user')
    const api = process.env.NEXT_PUBLIC_API
    try {
      const response = await fetch(`${api}/users/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie?.cookie}`,
        },
        body: JSON.stringify(followObj),
      })

      if (!response.ok) {
        console.log('Failed to follow User')
        setIsFollowing(false)
      }

      const result = await response.json()
      console.log(result)
    } catch (err: any) {
      setIsFollowing(false)
      console.log(err.message)
    }
  }

  return (
    <Button
      className='text-white rounded-full'
      onClick={() => {
        setIsFollowing(prev => !prev)
        handleFollow()
        handleUnfollow()
      }}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  )
}
