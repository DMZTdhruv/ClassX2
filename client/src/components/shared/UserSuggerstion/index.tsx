import { cookies } from 'next/headers'
import React from 'react'
import UserCard from '@/components/cards/UserCard'
import { shuffleArray } from '@/utils'
import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'
import { webUrl } from '@/Constants'

interface IUser {
  _id: string
  name: string
  username: string
  userProfileImage: string
  division: {
    _id: string
    divisionName: string
  }
}

interface IDecodedTokem {
  userID: string
  userProfileId: string
  username: string
  email: string
}

export default async function index() {
  try {
    const api = process.env.NEXt_PUBLIC_API
    const cookie = cookies()
    const token = cookie.get('classX_user_token')
    const tokenValue = token?.value || ''
    const decodedToken: IDecodedTokem = jwtDecode(tokenValue || '')

    const getUsers = async () => {
      try {
        const response = await fetch(`${api}/users/users-of-division`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        })

        if (!response.ok) {
          console.log('Failed to fetch user suggestions')
        }

        const { data } = await response.json()
        return data
      } catch (err) {
        console.log(err)
      }
    }

    const users: IUser[] = await getUsers()
    const reccomendedUsers = shuffleArray(users)
    const divisionName = users && users[0].division.divisionName
    return (
      <div className='bg-[#171717] w-[90%] rounded-[20px] px-[14px] mt-[33px] pb-[10px]'>
        <p className='py-[16.5px] font-semibold'>
          Students from your division {divisionName}
        </p>
        {reccomendedUsers?.map((user: IUser) => {
          if (user._id === decodedToken.userProfileId) {
            return
          }
          return (
            <UserCard
              key={user._id}
              currentUser={decodedToken.userProfileId}
              _id={user._id}
              name={user.name}
              username={user.username}
              userImageUrl={user.userProfileImage}
            />
          )
        })}
      </div>
    )
  } catch (err: any) {
    return <Link className='mt-5' href={`${webUrl}/auth/sign-in`}>Sign in</Link>
  }
}
