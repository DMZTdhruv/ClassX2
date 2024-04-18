'use client'

import React from 'react'
import useLogOut from '@/hooks/auth/useLogout'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'

const Setting = () => {
  const { logout } = useLogOut()
  const { authUser } = useAuthContext()
  return (
    <div
      className={` p-6 justify-center items-center w-full h-[100vh] z-50 fade-in-0 text-[13px] mb-4 md:text-[13px] flex gap-3  bg-[#0E0E0E]/80  `}
    >
      <div
        className={`md:w-[336px] animate-in fade-in-0 w-[280px]  flex flex-col bg-[#1E1E1E]/80 shadow-lg backdrop-blur-md py-[8px]  rounded-lg `}
      >
        <Link
          href={`/profile/${authUser?.userProfileId}`}
          className='font-bold text-left   py-2 px-4 mx-[8px] active:scale-95 hover:bg-neutral-700/10 rounded-lg'
        >
          Profile
        </Link>
        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>
        <Link
          href={`/profile/${authUser?.userProfileId}/saved`}
          className='font-bold text-left   py-2 px-4 mx-[8px] active:scale-95 hover:bg-neutral-700/10 rounded-lg'
        >
          Saved
        </Link>

        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>

        <button
          className='font-bold text-left text-red-500  py-2 px-4 mx-[8px] active:scale-95 hover:bg-red-500/10 rounded-lg'
          onClick={logout}
        >
          log out
        </button>
      </div>
    </div>
  )
}

export default Setting
