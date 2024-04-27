'use client'

import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const PostVideo = ({ url, aspectRatio }: { url: string; aspectRatio: string }) => {
  const { ref, inView } = useInView()

  useEffect(() => {
    console.log(inView)
  }, [inView])

  return (
    <div className='h-full w-full flex items-center'>
      <video
        ref={ref}
        src={url}
        autoPlay={!inView}
        muted
        loop
        controls={true}
        className={`h-full w-full  rounded-md transition-all object-cover aspect-square ${
          aspectRatio === '16:9' && 'aspect-video'
        }
        ${aspectRatio === '1:1' && 'aspect-square'}
        ${aspectRatio === '4:3' && 'fourRationThree'}
        ${aspectRatio === '3:4' && 'threeRatioFour'} `}
      ></video>
    </div>
  )
}

export default PostVideo
