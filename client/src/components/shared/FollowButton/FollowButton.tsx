'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthContext } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'

interface FollowButtonProps {
  _id: string
  userToFollowId: string
  classes?: string
}

export default function FollowButton({
  _id,
  userToFollowId,
  classes,
}: FollowButtonProps) {
  const api = process.env.NEXT_PUBLIC_API
  //@ts-ignore
  const [loading, setLoading] = useState<boolean>(true)
  const { authUser } = useAuthContext()
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  useEffect(() => {
    if (authUser) {
      setLoading(false)
    }
  }, [])

  const handleFollow = async () => {
    if (isFollowing) return
    try {
      const response = await fetch(`${api}/users/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userToFollowId: userToFollowId,
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        console.log('Failed to follow User')
        setIsFollowing(false)
      }

      const result = await response.json()
    } catch (err: any) {
      setIsFollowing(false)
      console.log(err.message)
    }
  }

  const handleUnfollow = async () => {
    if (!isFollowing) return
    try {
      const response = await fetch(`${api}/users/unFollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userToUnfollowId: userToFollowId,
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        setIsFollowing(true)
      }

      const result = await response.json()
    } catch (err: any) {
      setIsFollowing(true)
      console.log(err.message)
    }
  }

  const handleIsFollowing = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${api}/users/isFollowing?userToFollowId=${userToFollowId}`,
        {
          method: 'GET',
          credentials: 'include',
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleIsFollowing()
  }, [])

  if (loading) {
    return <Skeleton className='w-28 h-8' />
  }

  return (
    <Button
      className={`text-white rounded-full  ${classes}`}
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
