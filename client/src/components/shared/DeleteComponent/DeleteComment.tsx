'use client'

import { Api } from '@/Constants'
import useCookieProvider from '@/hooks/useCookieProvider'
import Style from './styles.module.css'

interface DeleteComment {
  userId: string
  deleteId: string
  handleModal: (data: boolean) => void
  className?: string
  handleDeleteComment: (data: string) => void
  type: string
}

export default function DeleteCommentComponent({
  userId,
  deleteId,
  handleModal,
  className,
  handleDeleteComment,
  type,
}: DeleteComment) {
  const cookie = useCookieProvider()
  const deleteComment = async () => {
    const CommentApi = `${Api}/post/comment/delete-comment/${deleteId}`
    const SubCommentApi = `${Api}/post/comment/subComment/delete-comment/${deleteId}`
    try {
      const response = await fetch(`${type === 'Comment' ? CommentApi : SubCommentApi}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${cookie?.cookie}`,
        },
      })

      if (!response.ok) {
        const result = await response.json()
        console.error(result.message)
        return
      }

      const result = await response.json()
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <div
      className={`fixed top-[50%] left-[50%] flex items-center justify-center gap-3 h-screen w-full bg-[#0E0E0E]/80 z-[1000000] translate-x-[-50%] translate-y-[-50%]`}
    >
      <div
        className={`w-[336px]  flex flex-col bg-[#1E1E1E]/80 shadow-lg backdrop-blur-md py-[8px]  rounded-[22px] ${className}`}
        style={{}}
      >
        {cookie?.userProfileId === userId ? (
          <button
            className='font-bold text-[#FF0000] py-[8px]  mx-[8px] active:scale-95 hover:bg-red-500/10 rounded-xl'
            onClick={() => {
              handleDeleteComment(deleteId)
              deleteComment()
              handleModal(false)
            }}
          >
            Delete
          </button>
        ) : (
          <button className='font-bold text-[#FF0000] py-[8px]  mx-[8px] active:scale-95 hover:bg-red-500/10 rounded-xl'>
            Report
          </button>
        )}

        <div className='w-full bg-[#474747]/80 my-[8px]  h-[2px]'></div>
        <button
          className='font-bold  py-[8px] mx-[8px]  rounded-xl active:scale-95 hover:bg-green-400/10'
          onClick={() => handleModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
