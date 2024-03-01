'use client'

import { deletePostFromUserPage, updateFeed } from '@/app/(root)/serverActions'
import { Api } from '@/Constants'
import useCookieProvider from '@/hooks/useCookieProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoWarningOutline } from 'react-icons/io5'

interface DeletComponent {
  deleteId: string
  userProfileId: string
  handleModal: (data: boolean) => void
  className?: string
  handlePostState?: (data: string) => void
  userPost?: boolean
}

export default function DeletePostModal({
  deleteId,
  userProfileId,
  handleModal,
  className,
  handlePostState,
  userPost,
}: DeletComponent) {
  const router = useRouter()
  console.log(userPost)
  const cookie = useCookieProvider()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const deletePost = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`${Api}/post/delete-post/${deleteId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${cookie?.cookie}`,
        },
      })

      if (!response.ok) {
        const result = await response.json()
        setErrorMessage(result?.message || 'Error in deleting post')
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)
        setIsDeleting(false)
        console.log('Failed to delete the post')
      }

      handlePostState?.(deleteId)
      setTimeout(() => {
        setIsDeleting(false)
      }, 500)
      handleModal(false)
      // deletePostFromUserPage()
      if (userPost) {
        deletePostFromUserPage()
        updateFeed()
        router.push('/profile')
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'hidden'
    return () => {
      body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div
      className={`fixed top-[50%] left-[50%] flex items-center justify-center gap-3 h-screen w-full bg-[#0E0E0E]/80 z-[1000000] translate-x-[-50%] translate-y-[-50%]`}
    >
      <div
        className={`w-[336px] ${
          isDeleting && 'pointer-events-none'
        } flex flex-col  bg-[#1E1E1E]/80 shadow-lg backdrop-blur-md py-[8px]  rounded-[22px] ${className}`}
      >
        {cookie?.userProfileId === userProfileId ? (
          <button
            className='font-bold text-[#FF0000] py-[8px]  mx-[8px] active:scale-95 hover:bg-red-500/10 rounded-xl'
            onClick={deletePost}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <p className='flex items-center justify-center gap-2'>
                <span className='dangerLoader inline-block'></span> Deleting....
              </p>
            ) : (
              <p>Delete</p>
            )}
          </button>
        ) : (
          <button className='font-bold text-[#FF0000] py-[8px]  mx-[8px] active:scale-95 hover:bg-red-500/10 rounded-xl'>
            Report
          </button>
        )}
        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>

        <button
          className='font-bold py-[8px]  mx-[8px] active:scale-95 hover:bg-neutral-500/10 rounded-xl'
          disabled={isDeleting}
        >
          Share to
        </button>
        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>

        <button
          className='font-bold py-[8px]  mx-[8px] active:scale-95 hover:bg-neutral-500/10 rounded-xl'
          disabled={isDeleting}
        >
          Copy Link
        </button>
        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>

        <button
          className='font-bold py-[8px]  mx-[8px] active:scale-95 hover:bg-neutral-500/10 rounded-xl'
          disabled={isDeleting}
        >
          Embed
        </button>

        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>
        <button
          className='font-bold  py-[8px] mx-[8px]  rounded-xl active:scale-95 hover:bg-green-400/10'
          onClick={() => handleModal(false)}
          disabled={isDeleting}
        >
          Cancel
        </button>
        {errorMessage && (
          <p className='text-center py-2'>
            Error: <span className=' text-red-500'>{errorMessage}</span>
          </p>
        )}
      </div>
      {cookie?.userProfileId === userProfileId && (
        <div className='absolute bottom-5 text-center mx-6'>
          <div className='opacity-70 flex flex-col justify-center items-center gap-3'>
            <IoWarningOutline color='#ffcc00' className='opacity-60' size={16} />
            The deletion process cannot be aborted once the delete button is pressed.
          </div>
        </div>
      )}
    </div>
  )
}
