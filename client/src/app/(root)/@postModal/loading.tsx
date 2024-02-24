import React from 'react'

export default function loading() {
  return (
    <div className='fixed top-[50%] z-[10000]  bg-neutral-900/90 left-[50%] h-screen w-full flexCenter gap-3 translate-x-[-50%] translate-y-[-50%]'>
      Loading... <div className='loader '></div>
    </div>
  )
}
