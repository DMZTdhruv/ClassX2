'use client'

import { useAuthContext } from '@/context/AuthContext'
import React from 'react'

const SyncData = () => {
  // const { setIsDataSynced, isDataSynced } = useAuthContext()

  // if (isDataSynced) {
  //   console.log(isDataSynced)
  //   return null
  // }

  return null

  return (
    <div
      className={`fixed top-[50%] left-[50%] text-[13px] md:text-[14px]  flex items-center justify-center gap-3 h-screen w-full bg-[#0E0E0E]/80 z-[1000000] translate-x-[-50%] translate-y-[-50%]`}
    >
      <div
        className={`w-[336px]  flex flex-col animate-in fade-in-0  bg-[#1E1E1E]/80 shadow-lg backdrop-blur-md py-[8px]  rounded-[22px] `}
      >
        <div className='px-8 text-center'>
          <h3 className='font-semibold'>Your data is not synced</h3>
          <p className='text-[12px] opacity-60'>
            Your local data across devices is different click the sync button to sync
            the data
          </p>
        </div>
        <div className='w-full bg-[#474747]/40 my-[8px]  h-[2px]'></div>
        <button
          className='font-bold py-[8px] text-green-400  mx-[8px] active:scale-95 hover:bg-neutral-500/10 rounded-xl'
          // onClick={syncData}
        >
          Sync
        </button>
      </div>
    </div>
  )
}

export default SyncData
