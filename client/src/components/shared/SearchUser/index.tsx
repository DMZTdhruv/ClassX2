'use client'

import { Input } from '@/components/ui/input'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import UserCard from '@/components/cards/UserCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthContext } from '@/context/AuthContext'

interface Iuser {
  _id: string
  username: string
  userProfileImage: string
  name: string
}

export default function SearchUser({ userId }: { userId: string }) {
  const [userName, setUserName] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(true)
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true)
    setUserName(e.target.value)
  }
  // @ts-ignore
  const { authUser } = useAuthContext()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const api = process.env.NEXT_PUBLIC_API
        const response = await fetch(`${api}/users/userprofile?username=${userName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        if (!response.ok) {
          console.log('Error finding the users')
        }

        const { data: result } = await response.json()
        setUsers(result)
      } catch (err) {
        console.log(err)
      } finally {
        setIsSearching(false)
      }
    }

    const delayTimeout = setTimeout(() => {
      if (userName) {
        getUsers()
      }
    }, 1000)

    return () => clearTimeout(delayTimeout)
  }, [userName])

  return (
    <div className='w-full relative  z-[100] flex justify-center shadow-lg'>
      <Input
        type='text'
        placeholder='Search a user'
        onChange={handleSearch}
        className=' md:rounded-full rounded-[10px] w-full border-none h-[35px] bg-[#171717] pl-[50px]'
        value={userName}
      />
      <Image
        src={`/assets/iconamoon_search-bold.svg`}
        width={50}
        height={0}
        style={{
          width: '50px',
          height: 'auto',
        }}
        alt='searchicon'
        className='rounded-r-[15px] opacity-40 absolute left-[0%] top-[50%] translate-y-[-50%] h-[100%] px-[15px]'
      />

      <div
        className={`w-full top-[55px] ${
          userName
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-0 opacity-0 translate-y-4'
        } transition-all rounded-xl max-h-[50vh] shadow-md shadow-neutral-800 overflow-y-auto  absolute flex items-center gap-4 p-[10px] flex-col border-neutral-800 border bg-[#0E0E0E] `}
      >
        {isSearching ? (
          <>
            <div className='md:p-auto px-[10px] py-[8px] flex items-center  gap-5 w-full'>
              <Skeleton className='min-h-12 min-w-12 rounded-full ' />
              <div className='space-y-2 w-full'>
                <Skeleton className='h-4 w-[40%]' />
                <Skeleton className='h-4 w-[30%]' />
              </div>
              <Skeleton className='h-6 w-20' />
            </div>
            <div className='md:p-auto p-[10px] flex items-center gap-5 w-full'>
              <Skeleton className='min-h-12 min-w-12 rounded-full ' />
              <div className='space-y-2 w-full'>
                <Skeleton className='h-4 w-[40%]' />
                <Skeleton className='h-4 w-[30%]' />
              </div>
              <Skeleton className='h-6 w-20' />
            </div>
          </>
        ) : (
          <div className='w-full flex flex-col relative'>
            {users.length === 0 ? (
              <p className='px-[20px]'>No users founded with this username</p>
            ) : (
              users?.map((user: Iuser) => {
                return (
                  <UserCard
                    userId={userId}
                    _id={user._id}
                    currentUser={authUser?.userProfileId || ''}
                    key={user._id}
                    userImageUrl={user.userProfileImage}
                    username={user.username}
                    name={user.name}
                  />
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}
