'use client'

import { IComments } from '@/Constants'
import React, { useContext, useState } from 'react'
import { createContext } from 'react'

interface IUserCommentReplies {
  parentCommentId: string
  comment: IComments[]
}

interface IPostCommentContext {
  postComments: IComments[]
  userCommentReplies: IUserCommentReplies[]
  replyingUserName: string
  setReplyingUserName: React.Dispatch<React.SetStateAction<string>>
  handleReplyingUsername: (username: string) => void
  handlePostComments: (comment: IComments[]) => void
  handleUserCommentReplies: (parentId: string, comment: IComments) => void
}

export const PostCommentContext = createContext<IPostCommentContext | undefined>(
  undefined
)

export const usePostCommentContext = () => {
  const context = useContext(PostCommentContext)
  if (!context) {
    throw new Error(
      'usePostCommentContext must be used within an PostCommentContextProvider'
    )
  }
  return context
}

const PostCommentContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [postComments, setPostComments] = useState<IComments[]>([])
  const [userCommentReplies, setUserCommentReplies] = useState<IUserCommentReplies[]>(
    []
  )
  const [replyingUserName, setReplyingUserName] = useState<string>('')

  const handleReplyingUsername = (username: string) => {
    setReplyingUserName(prev => username)
  }

  const handlePostComments = (comment: IComments[]) => {
    setPostComments(prev => [...comment])
  }

  const handleUserCommentReplies = (parentId: string, comment: IComments) => {

    setUserCommentReplies(prev => {
      const index = prev.findIndex(
        commentReply => commentReply.parentCommentId === parentId
      )
      if (index !== -1) {
        prev[index].comment.push(comment)
        return prev
      } else {
        return [...prev, { parentCommentId: parentId, comment: [comment] }]
      }
    })
  }

  return (
    <PostCommentContext.Provider
      value={{
        postComments,
        userCommentReplies,
        replyingUserName,
        setReplyingUserName,
        handleReplyingUsername,
        handlePostComments,
        handleUserCommentReplies,
      }}
    >
      {children}
    </PostCommentContext.Provider>
  )
}

export default PostCommentContextProvider
