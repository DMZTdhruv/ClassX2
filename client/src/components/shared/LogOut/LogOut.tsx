'use client'
import { HiLogout } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import useLogOut from '@/hooks/auth/useLogout'
import React from 'react'

const LogOut = ({ type, className }: { type: string; className?: string }) => {
  const { loading, logout } = useLogOut()
  return (
    <Button
      type='button'
      className={`text-white font-bold absolute  bottom-[41px] transition-all ${className}`}
      onClick={logout}
    >
      {type === 'mobile' ? (
        loading ? (
          <HiLogout className='animate-pulse' />
        ) : (
          <HiLogout />
        )
      ) : loading ? (
        <>
          <div className='lg:hidden'>
            <HiLogout className='animate-pulse' />
          </div>
          <div className='hidden lg:block'>Logging out..</div>
        </>
      ) : (
        <>
          <div className='lg:hidden'>
            <HiLogout />
          </div>
          <div className='hidden lg:block'>Log out</div>
        </>
      )}
    </Button>
  )
}

export default LogOut
