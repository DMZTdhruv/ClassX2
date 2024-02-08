'use client'

import React from 'react'
import useCoookieProvider from './useCoookieProvider'

async function useUserProvider() {
  const cookie = useCoookieProvider() || ''
  const {
    _id,
    userID,
    name,
    username,
    userProfileImage,
    enrollmentNumber,
    branches,
    isPrivate,
    semesterNumber,
    division,
  } = await getUserDetails(cookie);

  console.log(
    _id,
    userID,
    name,
    username,
    userProfileImage,
    enrollmentNumber,
    branches,
    isPrivate,
    semesterNumber,
    division
  )

  return {}
}

export default useUserProvider

const getUserDetails = async (cookie: string) => {
  const api = process.env.NEXT_PUBLIC_API
  const response = await fetch(`${api}/users/get-user-profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  })
  const { message } = await response.json()
  console.log(message)
  return message
}
