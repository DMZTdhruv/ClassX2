import { Api } from '@/Constants'

// convert this to client if you want to preserve update like feedback when navigating DHRUVV!!
export const getPosts = async (cookie: string, page: number) => {
  try {
    const response = await fetch(`${Api}/post/get-post?page=${page}&limit=${10}`, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
      cache: 'no-cache',
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
    console.error(error.message)
  }
}

export const getSavedPosts = async (cookie: string, page: number) => {
  try {
    const response = await fetch(`${Api}/post/saved-post?page=${page}&limit=${10}`, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
      cache: 'no-cache',
      next: {
        tags: ['savedPost'],
      },
    })

    const { data } = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }
    return data
  } catch (error: any) {
    console.error(error.message)
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
    return data
  } catch (error: any) {
    console.error(error.message)
  }
}
export const getTotalSavedPost = async (cookie: string) => {
  try {
    const response = await fetch(`${Api}/post/total-saved-post`, {
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
    return data
  } catch (error: any) {
    console.error(error.message)
  }
}
