'use server'

import { Api } from '@/Constants'
import { revalidateTag } from 'next/cache'

export const getUserProfile = async (cookie: string) => {
  const userProfileApi = `${Api}/users/get-user-profile`
  try {
    const response = await fetch(userProfileApi, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
      next: {
        tags: ['userProfile'],
      },
    })

    const data = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }

    return data.data
  } catch (err: any) {
    console.log(err.message)
  }
}

export const getUserPosts = async (
  userProfileId: string,
  token: string,
  page: number
) => {
  try {
    const response = await fetch(
      `${Api}/users/get-user-posts/${userProfileId}?page=${page}&limit=${10}`,
      {
        method: 'GET',
        headers: {
          Cookies: `classX_user_token=${token}`,
        },
        next: {
          tags: ['userPost'],
        },
      }
    )

    if (!response.ok) {
      console.log('There was an error')
    }

    const { data: result } = await response.json()
    return result
  } catch (error) {
    console.log(error)
  }
}

export const updateUserProfile = () => {
  revalidateTag('userProfile')
}
