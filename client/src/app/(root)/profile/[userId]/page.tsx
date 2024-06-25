import React from 'react';
import ProfilePosts from '../ProfilePosts';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { Api } from '@/Constants';
import { getUserProfileData } from '../ProfileAction';

interface Token {
  userProfileId: string;
}

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

const Page = async ({ params }: { params: { userId: string } }) => {
  const cookie = cookies();
  const token = cookie.get('classX_user_token');
  const { userProfileId }: Token = token
    ? jwtDecode(token?.value || '')
    : { userProfileId: '' };

  if (!cookie) {
    return <p>Unauthorized user</p>;
  }

  const userProfile: UserProfileProps = await getUserProfileData(
    params,
    token?.value || ''
  );


  return (
    <div>
      <ProfilePosts
        userProfileId={userProfile?.profileData._id}
        token={token?.value || ''}
        isDifferentUser={params.userId !== userProfileId}
        totalPosts={userProfile?.userStatus.postCount}
      />
    </div>
  );
};

export default Page;
