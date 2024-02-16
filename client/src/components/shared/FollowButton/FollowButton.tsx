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
  const api = process.env.NEXT_PUBLIC_API

  const cookie = useCookieProvider()
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  const handleFollow = async () => {
    if (isFollowing) return
    console.log('Is following')
    try {
      const response = await fetch(`${api}/users/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie?.cookie}`,
        },
        body: JSON.stringify({
          userToFollowId: userToFollowId,
        }),
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
    try {
      const response = await fetch(`${api}/users/unFollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie?.cookie}`,
        },
        body: JSON.stringify({
          userToUnfollowId: userToFollowId
        }),
      })

      if (!response.ok) {
        console.log('Failed to follow User')
        setIsFollowing(true)
      }

      const result = await response.json()
      console.log(result)
    } catch (err: any) {
      setIsFollowing(true)
      console.log(err.message)
    }
  }

  const handleIsFollowing = async () => {
    try {
      const response = await fetch(
        `${api}/users/isFollowing?userToFollowId=${userToFollowId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookie?.cookie}`,
          },
        }
      )

      if (!response.ok) {
        setIsFollowing(false)
        console.error('Failed to check the userFollowing')
      }

      const { data: result } = await response.json()
      if (result?.isFollowing) {
        setIsFollowing(true)
      } else {
        setIsFollowing(false)
      }
    } catch (err: any) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    handleIsFollowing()
  }, [])

  return (
    <Button
      className={`text-white rounded-full`}
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
