import { Api } from '@/Constants'

interface IAuthUser {
  userProfileId: string
}

interface PostLikes {
  _id: string
  setNumberOfLikes: (newNumberOfLikes: number) => void
  setIsLiked: (newValueOfLike: boolean) => void
  numberOfLikes: number

}

export const likePost = async ({
  _id,
  setNumberOfLikes,
  setIsLiked,
  numberOfLikes,
}: PostLikes) => {
  setNumberOfLikes(numberOfLikes + 1)
  try {
    const res = await fetch(`${Api}/post/like-post/${_id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await res.json()
    if (data.error) {
      throw new Error(data.error)
    }
  } catch (error: any) {
    console.error(error.message)
    setIsLiked(false)
    setNumberOfLikes(numberOfLikes)
  }
}

export const unlikePost = async ({
  _id,
  setNumberOfLikes,
  setIsLiked,
  numberOfLikes,
}: PostLikes) => {
  setNumberOfLikes(numberOfLikes - 1)
  try {
    const res = await fetch(`${Api}/post/unlike-post/${_id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await res.json()
    if (data.error) {
      throw new Error(data.error)
    }
  } catch (error: any) {
    setNumberOfLikes(numberOfLikes)
    console.error(error.message)
    setIsLiked(true)
  }
}

export const savePost = async (postId: string, isSaved: boolean) => {
  if (!isSaved) {
    try {
      const res = await fetch(`${Api}/post/save-post/${postId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      return true
    } catch (error: any) {
      console.error(error.message)
      return false
    }
  }
}
export const unSavePost = async (postId: string, isSaved: boolean) => {
  if (isSaved) {
    try {
      const res = await fetch(`${Api}/post/unsave-post/${postId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      return true
    } catch (error: any) {
      console.error(error.message)
      return false
    }
  }
}

export type { IAuthUser, PostLikes }
