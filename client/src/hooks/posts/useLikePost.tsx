import { Api } from '@/Constants'
import { usePostContext } from '@/context/PostContext'
import React, { SetStateAction } from 'react'

const useLikePost = () => {
  const { feedPost, setFeedPost } = usePostContext()
  const likePost = async (
    _id: string,
    index: number,
    setNumberOfLikes: React.Dispatch<SetStateAction<number>>,
    numberOfLikes: number,
    isLiked: boolean,
    setIsLiked: React.Dispatch<SetStateAction<boolean>>,
    authUser: { userProfileId: string },
    serverRendered: boolean
  ) => {
    setNumberOfLikes(prev => prev + 1)
    if (!serverRendered) {
      setFeedPost(prev => {
        const posts = [...prev]
        const post = posts[index]
        if (!post.likes.includes(authUser.userProfileId)) {
          post.likes.push(authUser.userProfileId)
        }
        return posts
      })
    }
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

      console.log(data)
    } catch (error: any) {
      console.error(error.message)
      setIsLiked(false)
      setNumberOfLikes(numberOfLikes)
      if (!serverRendered) {
        setFeedPost(prev => {
          const posts = [...prev]
          const post = posts[index]
          if (!post.likes.includes(authUser.userProfileId)) {
            post.likes.push(authUser.userProfileId)
          }
          return posts
        })
      }
    }
  }

  return { likePost }
}

export default useLikePost
