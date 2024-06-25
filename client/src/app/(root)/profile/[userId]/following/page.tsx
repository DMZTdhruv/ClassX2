'use client';

import { Api } from '@/Constants';
import { Button } from '@/components/ui/button';
import useGetFollowing from '@/hooks/user/useGetFollowing';
import useGetTotalFollowersAndFollowing from '@/hooks/user/useGetTotalFollowersAndFollowing';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { updateUserProfileData } from '../../ProfileAction';

interface IUser {
  followingDetails: {
    _id: string;
    username: string;
    userProfileImage: string;
  };
  isFollowedByUser: boolean;
}

const Page = ({ params }: { params: { userId: string } }) => {
  const { getUserFollowing, errorMessage } = useGetFollowing();

  const [page, setPage] = useState<number>(0);
  const [followingUsers, setFollowingUsers] = useState<IUser[]>([]);
  const { ref, inView } = useInView();
  const [totalFollowings, setTotalFollowings] = useState<number>();
  const [totalFollowingNumberFetched, setTotalFollowingNumberFetched] =
    useState<boolean>(false);

  const { getTotalFollowings } = useGetTotalFollowersAndFollowing();
  const [allFollowerLoaded, setAllFollowersLoaded] = useState<boolean>(false);

  const loadMoreFollowings = async () => {
    const nextPage = page + 1;
    const newUsers = await getUserFollowing(params.userId, nextPage);

    if (followingUsers.length === totalFollowings) {
      setAllFollowersLoaded(prev => true);
    } else {
      setFollowingUsers(prev => [...prev, ...newUsers]);
      setPage(nextPage);
    }
  };

  useEffect(() => {
    if (followingUsers.length === totalFollowings) {
      setAllFollowersLoaded(prev => true);
    }
  }, [followingUsers])

  useEffect(() => {
    if (totalFollowingNumberFetched) {
      if (inView) {
        loadMoreFollowings();
      }
    }
  }, [inView, totalFollowingNumberFetched]);

  const getTotalFollowingData = async () => {
    const result = await getTotalFollowings(params.userId);
    setTotalFollowings(result.followingCount);
    setTotalFollowingNumberFetched(prev => true);
  };

  useEffect(() => {
    getTotalFollowingData();
  }, []);

  return (
    <div className='w-full flex justify-center'>
      <div className='md:w-[60%] w-[95%]'>
        <h2 className='font-black text-[25px]  mx-2 text-center py-2'>
          You are following these accounts
        </h2>
        <div>
          {followingUsers.map((user: IUser) => {
            return <UserCard user={user} key={user.followingDetails._id} />;
          })}
          <div className='w-full flex justify-center'>
            {allFollowerLoaded ? (
              <p className='my-5'>You reached the end</p>
            ) : (
              <div className='loader mb-5' ref={ref}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ user }: { user: IUser }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(user.isFollowedByUser);

  const unFollow = async (userToUnFollowId: string) => {
    try {
      const response = await fetch(`${Api}/users/unFollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userToUnfollowId: userToUnFollowId,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        setIsFollowing(true);
      }

      updateUserProfileData();
    } catch (err: any) {
      setIsFollowing(true);
      console.log(err.message);
    }
  };

  const follow = async (userToFollowId: string) => {
    try {
      const response = await fetch(`${Api}/users/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userToFollowId: userToFollowId,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        console.log('Failed to follow User');
        setIsFollowing(false);
      }

      updateUserProfileData();
    } catch (error: any) {
      setIsFollowing(false);
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className='flex animate-in fade-in-0 hover:bg-neutral-800 cursor-pointer font-poppins items-center gap-2 rounded-xl transition-all p-4'>
        <Link
          href={`/profile/${user.followingDetails._id}`}
          className='flex items-center gap-2 flex-1'
        >
          <Image
            height={55}
            width={55}
            className='object-cover rounded-full aspect-square'
            alt={`Image of ${user.followingDetails.username}`}
            src={user.followingDetails.userProfileImage}
            unoptimized
          />
          <p className=' text-left font-semibold'>{user.followingDetails.username}</p>
        </Link>
        <div className=' '>
          <Button
            className='h-[30px] rounded-full font-bold active:scale-95 hover:bg-primary/50'
            onClick={() => {
              setIsFollowing(prev => !prev);
              if (isFollowing) {
                unFollow(user.followingDetails._id);
              } else {
                follow(user.followingDetails._id);
              }
            }}
          >
            {isFollowing ? 'Following' : 'Follow'}
            {/* {isFollowing ? 'Following' : 'Follow'} */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
