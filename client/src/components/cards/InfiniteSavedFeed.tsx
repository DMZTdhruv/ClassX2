'use client';
import { IPost } from '@/Constants';
import { getPosts, getSavedPosts } from '@/app/(root)/postActions';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import NormalPost from './NormalPost';
import { useClassXContext } from '@/context/ClassXContext';

const InfiniteSavedFeed = ({
  cookie,
  totalPost,
}: {
  cookie: string;
  totalPost: number;
}) => {
  const { setSavedPost, savedPost } = useClassXContext();
  const { ref, inView } = useInView();
  const [page, setPage] = useState<number>(0);
  const [allPostLoaded, setAllPostLoaded] = useState<boolean>(false);

  const loadMorePosts = async () => {
    const nextPage = page + 1;
    const newPosts: IPost[] = await getSavedPosts(cookie, nextPage);
    setSavedPost(prev => [...prev, ...newPosts]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      if (savedPost.length >= totalPost) {
        setAllPostLoaded(true);
        return;
      }
      loadMorePosts();
    }
  }, [inView, page]);

  return (
    <>
      <div className=' p-[1px]  grid grid-cols-3 max-w-[904px] gap-[1px]  '>
        {savedPost?.map(posts => {
          return (
            <NormalPost
              key={posts._id}
              _id={posts._id}
              attachments={posts.attachments}
            />
          );
        })}
      </div>
      <div className='w-full flex justify-center'>
        {allPostLoaded ? (
          <p className='my-5'>You are up-to-date</p>
        ) : (
          <div className='loader my-5' ref={ref}></div>
        )}
      </div>
    </>
  );
};

export default InfiniteSavedFeed;
