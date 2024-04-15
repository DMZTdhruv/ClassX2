'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ProfileNavigation = ({
  userId,
  currentUserId,
}: {
  userId: string
  currentUserId: string
}) => {
  const isSaved = usePathname().endsWith('/saved')
  const isActiveLinkClassName = `font-semibold opacity-100`
  return (
    <div className='flex items-center w-full justify-center pb-3 mb-3 border-b-2 border-neutral-800 gap-8'>
      <Link
        href={`/profile/${userId}`}
        className={`${!isSaved ? isActiveLinkClassName : 'font-normal opacity-50  '}`}
      >
        Posts
      </Link>
      {currentUserId === userId && (
        <Link
          href={`/profile/${userId}/saved`}
          className={`${
            isSaved ? isActiveLinkClassName : 'font-normal opacity-50 '
          } flex items-center gap-6'`}
        >
          <Image
            src={'/assets/bookmark.svg'}
            alt='bookmark picture'
            height={20}
            width={20}
          />
          Saved
        </Link>
      )}
    </div>
  )
}

export default ProfileNavigation
