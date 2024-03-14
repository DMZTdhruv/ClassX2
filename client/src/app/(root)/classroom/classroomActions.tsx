'use server'

import { Api } from '@/Constants'
import { revalidateTag } from 'next/cache'

export async function updateClassroom() {
  revalidateTag('classroom')
}

export async function updateClassroomUpdates() {
  revalidateTag('classroomUpdates')
}

export const getClassrooms = async (cookie: string, classId: string) => {
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
