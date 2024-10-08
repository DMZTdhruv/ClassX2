'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useAuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AccessProfile = () => {
  const { authUser } = useAuthContext()
  return (
    <div>
      {authUser ? (
        <Link href={`/profile/${authUser?.userProfileId}`}>
          <Image
            src={authUser.userProfileImage}
            alt={'user-image'}
            height={24}
            width={24}
            className='object-cover aspect-square rounded-full h-6 w-6'
            unoptimized
          />
        </Link>
      ) : (
        <Skeleton className='h-6 w-6 rounded-full' />
      )}
    </div>
  )
}

export default AccessProfile
