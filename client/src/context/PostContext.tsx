'use client'

import { IPost } from '@/Constants'
import React, { createContext, useContext, useState } from 'react'

interface IPostContext {
  explorePost: IPost[]
  setExplorePost: React.Dispatch<React.SetStateAction<IPost[] | []>>
  userPost: IPost[]
  setUserPost: React.Dispatch<React.SetStateAction<IPost[] | []>>
  savedPost: IPost[]
  setSavedPost: React.Dispatch<React.SetStateAction<IPost[] | []>>
  feedPost: IPost[]
  setFeedPost: React.Dispatch<React.SetStateAction<IPost[] | []>>
  totalPostDeleted: number
  setTotalPostDeleted: React.Dispatch<React.SetStateAction<number>>
}

export const PostContext = createContext<IPostContext | undefined>(undefined)

export const PostContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [explorePost, setExplorePost] = useState<IPost[]>([])
  const [userPost, setUserPost] = useState<IPost[]>([])
  const [savedPost, setSavedPost] = useState<IPost[]>([])
  const [feedPost, setFeedPost] = useState<IPost[]>([])
  const [totalPostDeleted, setTotalPostDeleted] = useState<number>(0)
  return (
    <PostContext.Provider
      value={{
        feedPost,
        setFeedPost,
        explorePost,
        setExplorePost,
        userPost,
        setUserPost,
        savedPost,
        setSavedPost,
        totalPostDeleted,
        setTotalPostDeleted,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = () => {
  const postContext = useContext(PostContext)
  if (!postContext) {
    throw new Error('usePostContext must be used within a PostContextProvider')
  }
  return postContext
}

export default PostContextProvider
