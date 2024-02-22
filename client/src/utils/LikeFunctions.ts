interface Cookie {
  userProfileId: string
  cookie: string
}

interface PostLikes {
  _id: string
  isLiked: boolean
  setNumberOfLikes: (newNumberOfLikes: number) => void
  setIsLiked: (newValueOfLike: boolean) => void
  numberOfLikes: number
  cookie?: Cookie | null
  endPoint: string
  isDevMode?: boolean | null
}

export const likePost = async ({
  _id,
  isLiked,
  setNumberOfLikes,
  setIsLiked,
  numberOfLikes,
  cookie,
  endPoint,
  isDevMode,
}: PostLikes) => {
  console.log(isLiked)

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
        Authorization: `Bearer ${cookie?.cookie}`,
      },
      body: JSON.stringify({
        userProfileID: cookie?.userProfileId,
        postId: _id,
      }),
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
  cookie,
  endPoint,
  isDevMode,
}: PostLikes) => {
  if (!isLiked) return
  console.log('You are unliking the post')
  setNumberOfLikes(numberOfLikes - 1)
  const api = process.env.NEXT_PUBLIC_API
  const unlikeApi = `${api}/${endPoint}`

  if (isDevMode) return
  try {
    const response = await fetch(`${unlikeApi}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${cookie?.cookie}`,
      },
      body: JSON.stringify({
        userProfileID: cookie?.userProfileId,
        postId: _id,
      }),
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

export type { Cookie, PostLikes }
