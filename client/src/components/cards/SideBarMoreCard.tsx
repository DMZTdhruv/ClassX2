import React from 'react'
import LogOut from '../shared/LogOut/LogOut'
import useLogOut from '@/hooks/auth/useLogout'

const SideBarMoreCard = () => {
  const { logout } = useLogOut()
  return (
    <div
      className={`animate-in  fade-in-0 text-[13px] mb-4 md:text-[13px] flex gap-3  w-full bg-[#0E0E0E]/80  `}
    >
      <div
        className={`md:w-[336px] animate-in fade-in-0 w-[280px]  flex flex-col bg-[#1E1E1E]/80 shadow-lg backdrop-blur-md py-[8px]  rounded-lg `}
      >
        <button className='font-bold text-left   py-2 px-4 mx-[8px] active:scale-95 hover:bg-neutral-700/10 rounded-lg'>
          Settings
        </button>
        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>

        <button className='font-bold text-left   py-2 px-4 mx-[8px] active:scale-95 hover:bg-neutral-700/10 rounded-lg'>
          Dark mode
        </button>
        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>

        <button className='font-bold text-left  py-2 px-4 mx-[8px] active:scale-95 hover:bg-neutral-700/10 rounded-lg'>
          Report bug
        </button>
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

export default SideBarMoreCard
