'use server'

import { Api } from '@/Constants'
import { revalidateTag } from 'next/cache'

export async function updateClassroom() {
  revalidateTag('classroom')
}

export async function updateClassroomUpdates() {
  revalidateTag('classroomUpdates')
}

export const getClassroomData = async (cookie: string, classId: string) => {
  try {
    const res = await fetch(`${Api}/classroom/${classId}`, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
      cache: 'no-store',
      next: {
        tags: ['classroom'],
      },
    })

    const data = await res.json()
    if (data.error) {
      throw new Error(`${data.error}`)
    }
    return data.data
  } catch (error: any) {
    console.error(error.message)
  }
}

export const getClassroomUpdates = async (
  cookie: string,
  classId: string,
  page: number
) => {
  try {
    const res = await fetch(
      `${Api}/classroom/updates/${classId}?page=${page}&limit=10`,
      {
        method: 'GET',
        headers: {
          Cookies: `classX_user_token=${cookie}`,
        },
        cache: 'no-store',
        next: {
          tags: ['classroomUpdates'],
        },
      }
    )

    const data = await res.json()
    if (data.error) {
      throw new Error(`${data.error}`)
    }
    return data.data
  } catch (error: any) {
    console.error(error.message)
  }
}

export const getClassroomTopics = async (cookie: string, classId: string) => {
  try {
    const res = await fetch(`${Api}/classroom/${classId}/topics`, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
      cache: 'no-store',
      next: {
        tags: ['classroomTopics'],
      },
    })

    const data = await res.json()
    if (data.error) {
      throw new Error(data.error)
    }
    console.log(data)
    return data.data
  } catch (error: any) {
    console.log(error.message)
  }
}

export const getClassroomClassworkData = async (
  cookie: string,
  classId: string,
  topicName: string
) => {
  try {
    const res = await fetch(`${Api}/classroom/classwork/${classId}/${topicName}`, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
      cache: 'no-store',
      next: {
        tags: ['classroomClassworkData'],
      },
    })

    const data = await res.json()
    if (data.error) {
      throw new Error(data.error)
    }
    return data.data
  } catch (error: any) {
    console.log(error.message)
  }
}

export const getClassworkById = async (
  cookie: string,
  classId: string,
  classworkId: string
) => {
  try {
    const res = await fetch(`${Api}/classroom/${classId}/classwork/${classworkId}`, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
    })

    const data = await res.json()
    console.log(data)
    if (data.error) {
      throw new Error(data.error)
    }
    return data.data
  } catch (error: any) {
    console.log(error.message)
  }
}

export const getClassroomStudents = async (cookie: string, classId: string) => {
  try {
    const res = await fetch(`${Api}/classroom/${classId}/people/students`, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
    })

    const data = await res.json()
    if (data.error) {
      return data.error
    }

    return data.data
  } catch (error: any) {
    console.log(error.message)
  }
}

export const getClassroomAdmins = async (cookie: string, classId: string) => {
  try {
    const res = await fetch(`${Api}/classroom/${classId}/people/admins`, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
    })

    const data = await res.json()
    if (data.error) {
      return data.error
    }

    return data.data
  } catch (error: any) {
    console.log(error.message)
  }
}
