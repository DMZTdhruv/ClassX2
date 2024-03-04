interface IAuthUser {
  userProfileId: string
}

interface PostLikes {
  _id: string
  isLiked: boolean
  setNumberOfLikes: (newNumberOfLikes: number) => void
  setIsLiked: (newValueOfLike: boolean) => void
  numberOfLikes: number
  authUser: IAuthUser
  endPoint: string
  isDevMode?: boolean | null
}

export const likePost = async ({
  _id,
  isLiked,
  setNumberOfLikes,
  setIsLiked,
  numberOfLikes,
  authUser,
  endPoint,
  isDevMode,
}: PostLikes) => {
  if (isLiked) return
  setNumberOfLikes(numberOfLikes + 1)
  const api = process.env.NEXT_PUBLIC_API
  const likeApi = `${api}/${endPoint}`

  if (isDevMode) return

  try {
    const response = await fetch(`${likeApi}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userProfileID: authUser?.userProfileId,
        postId: _id,
      }),
      credentials: 'include',
    })

    if (!response.ok) {
      setNumberOfLikes(numberOfLikes)
      setIsLiked(false)
      throw new Error('Error liking in post ')
    }

    const result = await response.json()
  } catch (err) {
    console.log(err)
  }
}

export const unlikePost = async ({
  _id,
  isLiked,
  setNumberOfLikes,
  setIsLiked,
  numberOfLikes,
  authUser,
  endPoint,
  isDevMode,
}: PostLikes) => {
  if (!isLiked) return
  setNumberOfLikes(numberOfLikes - 1)
  const api = process.env.NEXT_PUBLIC_API
  const unlikeApi = `${api}/${endPoint}`

  if (isDevMode) return
  try {
    const response = await fetch(`${unlikeApi}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userProfileID: authUser?.userProfileId,
        postId: _id,
      }),
      credentials: 'include',
    })

    if (!response.ok) {
      setNumberOfLikes(numberOfLikes)
      setIsLiked(true)
      throw new Error('Error unliking the post ')
    }

    const result = await response.json()
  } catch (err) {
    console.log(err)
  }
}

export type { IAuthUser, PostLikes }
