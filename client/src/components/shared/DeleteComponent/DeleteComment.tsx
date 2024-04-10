'use client'

import { Api } from '@/Constants'
import { useAuthContext } from '@/context/AuthContext'

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
  //@ts-ignore
  const { authUser } = useAuthContext()
  const deleteComment = async () => {
    const CommentApi = `${Api}/post/comment/delete-comment/${deleteId}`
    const SubCommentApi = `${Api}/post/comment/subComment/delete-comment/${deleteId}`
    try {
      const response = await fetch(
        `${type === 'Comment' ? CommentApi : SubCommentApi}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      )

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
      className={`fixed top-[50%] text-[13px] left-[50%] md:text-[15px] flex items-center justify-center gap-3 h-screen w-full bg-[#0E0E0E]/80 z-[1000000] translate-x-[-50%] translate-y-[-50%]`}
    >
      <div
        className={`md:w-[336px] animate-in fade-in-0 w-[280px]  flex flex-col bg-[#1E1E1E]/80 shadow-lg backdrop-blur-md py-[8px]  rounded-[22px] ${className}`}
        style={{}}
      >
        {authUser?.userProfileId === userId ? (
          <button
            className='font-bold text-[#FF0000] py-[4px]  mx-[8px] active:scale-95 hover:bg-red-500/10 rounded-xl'
            onClick={() => {
              handleDeleteComment(deleteId)
              deleteComment()
              handleModal(false)
            }}
          >
            Delete
          </button>
        ) : (
          <button className='font-bold text-[#FF0000] py-[4px]  mx-[8px] active:scale-95 hover:bg-red-500/10 rounded-xl'>
            Report
          </button>
        )}

        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>
        <button
          className='font-bold  py-[4px] mx-[8px]  rounded-xl active:scale-95 hover:bg-green-400/10'
          onClick={() => handleModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
