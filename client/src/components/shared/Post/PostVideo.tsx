'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, memo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const PostVideo = ({
  url,
  aspectRatio,
  play = false,
}: {
  url: string;
  aspectRatio: string;
  play?: boolean;
}) => {
  const { ref, inView } = useInView();
  const videoRef = useRef<HTMLVideoElement>(null);
  const onPostPath = usePathname().includes('/post');

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
    }
  }, [inView]);

  useEffect(() => {
    if (videoRef.current && onPostPath) {
      videoRef.current.pause();
    }
  }, [onPostPath]);

  return (
    <div className='h-full w-full flex items-center transition-all' ref={ref}>
      <video
        src={url}
        ref={videoRef}
        muted={false}
        loop
        autoPlay={play}
        controls={true}
        className={`h-full w-full  rounded-md transition-all object-cover aspect-square ${
          aspectRatio === '16:9' && 'aspect-video'
        }
        ${aspectRatio === '1:1' && 'aspect-square'}
        ${aspectRatio === '4:3' && 'fourRationThree'}
        ${aspectRatio === '3:4' && 'threeRatioFour'} `}
      ></video>
    </div>
  );
};

export default PostVideo;
