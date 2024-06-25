'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { formatMessageSideBarDate } from '@/utils/formatDate';
import Link from 'next/link';
import { IPost } from '@/Constants';
import { savePost, unSavePost } from '@/utils/LikeFunctions';
import { BsThreeDots } from 'react-icons/bs';
import { useAuthContext } from '@/context/AuthContext';
import { Skeleton } from '../ui/skeleton';
import useLikePost from '@/hooks/posts/useLikePost';
import useUnlikePost from '@/hooks/posts/useUnlikePost';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel';
import { useInView } from 'react-intersection-observer';
import PostVideo from '../shared/Post/PostVideo';
import SuggestedUser from './SuggestedUser';
import { LuSend } from 'react-icons/lu';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '../ui/input';

const Post: React.FC<IPost> = ({
  _id,
  attachments,
  aspectRatio,
  index,
  caption,
  location,
  category,
  postedBy,
  likes,
  serverRenderedPost,
  comments,
  saved,
  createdAt,
  handleDeletePostDetails,
  handleDeleteModal,
}) => {
  const date = new Date(createdAt);
  const { ref, inView } = useInView();

  //@ts-ignore
  const { authUser } = useAuthContext();
  const { likePost } = useLikePost();
  const { unlikePost } = useUnlikePost();

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const [numberOfLikes, setNumberOfLikes] = useState<number>(likes.length);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showFullCaption, setShowFullCaption] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  const [openShareToToggle, setOpenShareToToggle] = useState<boolean>(false);

  useEffect(() => {
    setIsLiked(likes.filter(id => id === authUser?.userProfileId).length > 0);
    setIsSaved(saved?.filter(id => id === authUser?.userProfileId).length > 0);
  }, [authUser]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='w-full animate-in fade-in-0 lg:w-[544px] h-auto  border-b-2 border-[#171717] font-poppins  postSection'>
      <div className='h-[60px] px-[15px] flex items-center justify-between md:text-[14px] text-[12px]'>
        {openShareToToggle && (
          <div className='h-screen w-full animate-in fade-in-0 bg-[#0E0E0E]/80 fixed top-0 left-0 z-[100]'>
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.2,
                type: 'spring',
                stiffness: 800,
                damping: 50,
              }}
              style={{
                position: 'fixed',
                top: '50%',
                zIndex: '100',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <SuggestedUser postId={_id} setOpenShareToToggle={setOpenShareToToggle} />
            </motion.div>
          </div>
        )}
        <div className='flex items-center justify-between w-full gap-[11px]'>
          <div className='flex items-center gap-[11px]'>
            <Image
              src={postedBy?.userProfileImage}
              width={30}
              height={30}
              alt='user jpg'
              className='rounded-full object-cover '
              style={{
                width: '30px',
                height: '30px',
              }}
              unoptimized
            />
            <div className='flex font-semibold gap-3 items-center'>
              <div>
                <div className='flex items-center gap-2'>
                  <Link
                    href={`/profile/${postedBy._id}`}
                    className='flex items-center gap-3'
                  >
                    {postedBy?.username}
                  </Link>
                  <span className=' h-1 w-1 bg-neutral-600 rounded-full'></span>
                  <span
                    className='text-neutral-500 md:text-[13px] text-[11px]'
                    suppressHydrationWarning={true}
                  >
                    {formatMessageSideBarDate(date)}
                  </span>
                </div>
                <span className='text-[12px] '>{location}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              handleDeleteModal(true);
              handleDeletePostDetails({
                userProfileId: postedBy._id,
                deleteId: _id,
              });
            }}
          >
            <BsThreeDots
              size={18}
              className={`active:scale-75  active:opacity-75 transition-all flex space-x-[2px] items-center`}
            />
          </button>
        </div>
      </div>
      <div className='relative'>
        {attachments?.length > 0 && (
          <Carousel className='md:w-[560px]   rounded-md  h-auto' setApi={setApi}>
            <CarouselContent className='md:w-[560px]  rounded-md'>
              {attachments?.map(attachment => {
                return (
                  <CarouselItem className='rounded-md relative' key={attachment._id}>
                    {attachment.extension === 'mp4' ? (
                      <PostVideo url={attachment.url} aspectRatio={aspectRatio} />
                    ) : (
                      <Image
                        src={attachment.url}
                        alt='image'
                        width={384}
                        height={0}
                        onLoad={() => {
                          setLoadingImage(true);
                        }}
                        style={{ height: 'auto', width: '560px' }}
                        unoptimized={loadingImage}
                        className={`object-cover rounded-md  md:w-[560px]  border-2 border-[#171717]
                          ${
                            !loadingImage
                              ? 'animate-pulse rounded-md bg-neutral-700'
                              : ''
                          }
                          
                          ${aspectRatio === '16:9' && 'aspect-video'}
                          ${aspectRatio === '1:1' && 'aspect-square'}
                          ${aspectRatio === '4:3' && 'fourRationThree'}
                          ${aspectRatio === '3:4' && 'threeRatioFour'}
                          `}
                      />
                    )}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        )}
        {attachments.length > 1 && (
          <div className='py-2 absolute left-[50%] -translate-x-[50%] text-center mt-2 text-sm text-muted-foreground flex items-center gap-1 justify-center'>
            {attachments.map((attachment, index) => (
              <div
                key={attachment._id}
                className={`h-1 w-1 rounded-full transition-all ${
                  index === current - 1 ? 'bg-primary scale-150' : 'bg-neutral-600 '
                } `}
              ></div>
            ))}
          </div>
        )}
      </div>
      <div>
        {authUser ? (
          <div className='px-[13px] gap-[15px] md:h-[60px] h-[45px]  w-full flex items-center justify-between mt-[3px]'>
            <div className='flex gap-[15px] items-center'>
              <button
                onClick={() => {
                  setIsLiked(prev => !prev);
                  if (!isLiked) {
                    likePost(
                      _id,
                      index,
                      setNumberOfLikes,
                      numberOfLikes,
                      isLiked,
                      setIsLiked,
                      authUser,
                      serverRenderedPost
                    );
                  } else {
                    unlikePost(
                      _id,
                      index,
                      setNumberOfLikes,
                      numberOfLikes,
                      isLiked,
                      setIsLiked,
                      authUser,
                      serverRenderedPost
                    );
                  }
                }}
                className='hover:scale-105'
              >
                {isLiked ? (
                  <Image
                    src={`/assets/filledHeart.svg`}
                    width={30}
                    height={30}
                    alt='user jpg'
                    className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 transition-all'
                    priority
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                  />
                ) : (
                  <Image
                    src={`/assets/heart.svg`}
                    width={30}
                    height={30}
                    alt='user jpg'
                    className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 transition-all'
                    priority
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                  />
                )}
              </button>
              <Link href={`/post/${_id}`} scroll={false}>
                <Image
                  src={`/assets/comment.svg`}
                  width={30}
                  height={30}
                  alt='user jpg'
                  unoptimized
                  priority
                  className='rounded-full transition-all sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 '
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                />
              </Link>
              <LuSend
                className='h-[22px] translate-y-[-3px] w-[22px] rotate-[15deg] active:scale-90 hover:scale-[1.05] transition-all cursor-pointer '
                onClick={() => setOpenShareToToggle(prev => !prev)}
              />
            </div>
            <div>
              {isSaved ? (
                <button
                  onClick={() => {
                    setIsSaved(prev => !prev);
                    const data = unSavePost(_id, isSaved);
                    if (!data) {
                      setIsSaved(false);
                    }
                  }}
                >
                  <Image
                    src='/assets/bookmark-fill.svg'
                    width={30}
                    height={30}
                    priority
                    unoptimized
                    alt='bookmark icon'
                    className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 '
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                  />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsSaved(prev => !prev);
                    const data = savePost(_id, isSaved);
                    if (!data) {
                      setIsSaved(false);
                    }
                  }}
                >
                  <Image
                    src='/assets/bookmark.svg'
                    width={30}
                    height={30}
                    priority
                    unoptimized
                    alt='bookmark icon'
                    className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 fill-blue-500'
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                  />
                </button>
              )}
            </div>
          </div>
        ) : (
          <Skeleton className='m-[12px]   md:h-[40px] h-[25px] w-[40%]' />
        )}
        <div className='px-[15px] md:text-[14px] flex flex-col gap-[3px] text-[12px] font-semibold mb-[20px] '>
          <span className=''>{numberOfLikes} likes</span>
          {caption.length > 85 ? (
            showFullCaption ? (
              <pre className=' text-wrap font-poppins'>
                {caption}
                <button
                  className='text-neutral-500 mx-[10px] inline-block'
                  onClick={() => {
                    setShowFullCaption(prev => !prev);
                  }}
                >
                  less
                </button>
              </pre>
            ) : (
              <pre className=' text-wrap font-poppins'>
                {caption.slice(0, 85)}...
                <button
                  className='text-neutral-500 mx-[10px] inline-block'
                  onClick={() => {
                    setShowFullCaption(prev => !prev);
                  }}
                >
                  more
                </button>
              </pre>
            )
          ) : (
            <p>{caption}</p>
          )}
          {comments.length > 0 && (
            <Link href={`/post/${_id}`} scroll={false}>
              <p className='text-neutral-500 inline-block'>
                view all {comments.length} comments
              </p>
              {comments.length !== 0 && (
                <p className='text-neutral-200'>
                  {comments[0]?.postedBy?.username} {comments[0].commentText}
                </p>
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
