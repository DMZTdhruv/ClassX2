'use client'

import { Input } from '@/components/ui/input'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import UserCard from '@/components/cards/UserCard'
import { Skeleton } from '@/components/ui/skeleton'
import useCookieProvider from '@/hooks/useCookieProvider'

interface Iuser {
  _id: string
  username: string
  userProfileImage: string
  name: string
}

export default function index() {
  const [userName, setUserName] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(true)
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true)
    setUserName(e.target.value)
  }
  const cookie = useCookieProvider()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const api = process.env.NEXT_PUBLIC_API
        const response = await fetch(
          `${api}/users/userprofile?username=${userName}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${cookie?.cookie}`,
            },
          }
        )

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
    }, 2000)

    return () => clearTimeout(delayTimeout)
  }, [userName])

  return (
    <div className='w-full relative flex justify-center'>
      <Input
        type='text'
        placeholder='Enter username'
        onChange={handleSearch}
        className=' rounded-full w-[90%] h-[40px] bg-[#171717] pr-[50px]'
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
        className='rounded-r-[15px] absolute right-[6%] top-[50%] translate-y-[-50%] h-[100%] px-[15px]'
      />

      <div
        className={`w-[90%] top-[70px] ${
          userName
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-0 opacity-0 translate-y-4'
        } transition-all rounded-2xl max-h-[50vh] shadow-sm overflow-y-auto  absolute flex items-center p-[10px] gap-[10px] flex-col border bg-[#171717] `}
      >
        {isSearching ? (
          <>
            <div className='flex items-center space-x-4 w-full'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='space-y-2 w-[80%]'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
              </div>
            </div>
            <div className='flex items-center space-x-4 w-full'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='space-y-2 w-[80%]'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
              </div>
            </div>
            <div className='flex items-center space-x-4 w-full'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='space-y-2 w-[80%]'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
              </div>
            </div>
          </>
        ) : (
          <div className='w-full flex flex-col'>
            {users.length === 0 ? (
              <p>No users founded with this username</p>
            ) : (
              users?.map((user: Iuser) => {
                return (
                  <UserCard
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
