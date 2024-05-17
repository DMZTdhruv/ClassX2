import React from 'react';
// import PostSection from
const PostSection = dynamic(() => import('./PostSection'), {
  loading: () => {
    return <p>Loading..</p>;
  },
});

import SearchRightBar from '@/components/shared/SearchRightBar';
import { cookies } from 'next/headers';
import { Skeleton } from '@/components/ui/skeleton';
import { getPosts, getTotalPost } from './postActions';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import dynamic from 'next/dynamic';

export default async function HomeLayout() {
  const cookie = cookies().get('classX_user_token')?.value;
  const postData = await getPosts(cookie || '', 1);
  const decodedValue = cookie ? jwtDecode(cookie || '') : '';
  const totalPost = await getTotalPost(cookie || '');

  if (postData?.error) {
    return (
      <div className='xl:w-[60%] h-[100vh] md w-full flex-1 px-[16px] flex gap-5 justify-center'>
        <div className='flex items-center flex-col  gap- 2 justify-center'>
          {postData.error}
          <Link href={`/auth/sign-in`} className='text-primary hover:underline'>
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className='xl:w-[60%] mt-[80px] md:mt-[40px] w-full flex-1 px-[16px] flex gap-5 justify-center'>
        <div className='gap-5 flex flex-col'>
          <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
          <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
        </div>
      </div>
    );
  }

  return (
    <section className='flex w-full'>
      <PostSection postData={postData} totalPost={totalPost} cookie={cookie || ''} />
      {/*@ts-ignore  */}
      <SearchRightBar userProfileId={decodedValue?.userProfileId || ''} />
    </section>
  );
}
