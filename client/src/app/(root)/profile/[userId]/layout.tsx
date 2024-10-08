import UserHeader from '@/components/shared/UserHeader';
import React from 'react';
import ProfilePosts from '../ProfilePosts';
import { cookies } from 'next/headers';
import { Api } from '@/Constants';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import ProfileNavigation from '@/components/shared/profile/ProfileNavigation';
import { usePresence } from 'framer-motion';

interface UserProfileProps {
  profileData: {
    _id: string;
    userID: string;
    name: string;
    username: string;
    about: string;
    userProfileImage: string;
  };
  userStatus: {
    _id: string;
    followersCount: number;
    postCount: number;
    followingCount: number;
  };
}

interface Token {
  userProfileId: string;
}

const ProfilePage = async ({
  params,
  children,
}: {
  params: { userId: string };
  children: React.ReactNode;
}) => {
  const cookie = cookies();
  const token = cookie.get('classX_user_token');
  const { userProfileId }: Token = token
    ? jwtDecode(token?.value || '')
    : { userProfileId: '' };

  if (!token) {
    return (
      <div className='xl:w-[60%] h-[100vh]  w-full flex-1 px-[16px] flex gap-5 justify-center'>
        <div className='flex items-center justify-center flex-col'>
          Unauthorized user
          <Link href={`/auth/sign-in`} className='text-primary hover:underline'>
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const getUserProfile = async () => {
    const userProfileApi = `${Api}/users?userId=${params.userId}`;
    try {
      const response = await fetch(userProfileApi, {
        method: 'GET',
        headers: {
          Cookies: `classX_user_token=${token?.value}`,
        },
        cache: 'no-cache',
      });

      const data = await response.json();
      if (data.error) {
        console.log('Failed to fetch the user');
      }

      return data.data.data;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const userProfile: UserProfileProps = await getUserProfile();
  console.log(userProfile);
  return (
    <section className='flex mt-[80px]  md:mt-[0px] sm:px-[16px] flex-col items-center gap-[60px] '>
      <UserHeader
        _id={userProfile?.profileData?._id}
        name={userProfile?.profileData?.name}
        username={userProfile?.profileData?.username}
        about={userProfile?.profileData?.about}
        userProfileImage={userProfile?.profileData?.userProfileImage}
        postCount={userProfile?.userStatus?.postCount}
        followersCount={userProfile?.userStatus?.followersCount}
        followingCount={userProfile?.userStatus?.followingCount}
      />

      <div className='w-full max-w-[904px]'>
        <ProfileNavigation
          userId={userProfile?.profileData?._id}
          currentUserId={userProfileId}
        />
        {children}
      </div>
    </section>
  );
};

export default ProfilePage;
