'use client'

import useCookieProvider from '@/hooks/useCookieProvider'

interface DeletComponent {
  userId: string
  endPoint: string
  deleteId: string
  userProfileId: string
  handleModal: (data: boolean) => void
  className?: string
}

export default function DeletePostModal({
  endPoint,
  deleteId,
  userProfileId,
  handleModal,
  className,
}: DeletComponent) {
  const cookie = useCookieProvider()

  return (
    <div
      className={`fixed top-[50%] left-[50%] flex items-center justify-center gap-3 h-screen w-full bg-[#0E0E0E]/80 z-[1000000] translate-x-[-50%] translate-y-[-50%]`}
    >
      <div
        className={`w-[336px] flex flex-col  bg-[#1E1E1E]/80 shadow-lg backdrop-blur-md py-[8px]  rounded-[22px] ${className}`}
      >
        {cookie?.userProfileId === userProfileId ? (
          <button className='font-bold text-[#FF0000] py-[8px]  mx-[8px] active:scale-95 hover:bg-red-500/10 rounded-xl'>
            Delete
          </button>
        ) : (
          <button className='font-bold text-[#FF0000] py-[8px]  mx-[8px] active:scale-95 hover:bg-red-500/10 rounded-xl'>
            Report
          </button>
        )}
        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>

        <button className='font-bold py-[8px]  mx-[8px] active:scale-95 hover:bg-neutral-500/10 rounded-xl'>
          Share to
        </button>
        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>

        <button className='font-bold py-[8px]  mx-[8px] active:scale-95 hover:bg-neutral-500/10 rounded-xl'>
          Copy Link
        </button>
        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>

        <button className='font-bold py-[8px]  mx-[8px] active:scale-95 hover:bg-neutral-500/10 rounded-xl'>
          Embed
        </button>

        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>
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
