import { Api } from '@/Constants'

export const getPosts = async (cookie: string, page: number) => {
  try {
    const response = await fetch(`${Api}/post/get-post?page=${page}&limit=${10}`, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
      cache: 'no-store',
      next: {
        tags: ['feedPost'],
      },
    })

    const { data } = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }
    return data
  } catch (error: any) {
    console.log(error.message)
  }
}

export const getTotalPost = async (cookie: string) => {
  try {
    const response = await fetch(`${Api}/post/total-post`, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
      cache: 'no-store',
    })

    const { data } = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }
    console.log(data)
    return data
  } catch (error: any) {
    console.log(error.message)
  }
}
