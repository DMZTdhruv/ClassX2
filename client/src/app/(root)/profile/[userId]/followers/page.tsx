'use client';
import { Button } from '@/components/ui/button';
import useGetFollowers from '@/hooks/user/useGetFollowers';
import useGetTotalFollowersAndFollowing from '@/hooks/user/useGetTotalFollowersAndFollowing';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { updateUserProfileData } from '../../ProfileAction';
import { Api } from '@/Constants';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '@/components/ui/skeleton';

interface IUser {
  followerDetails: {
    _id: string;
    username: string;
    userProfileImage: string;
  };
  isFollowedByUser: boolean;
}

const Page = ({ params }: { params: { userId: string } }) => {
  // followers
  const { getUserFollowers } = useGetFollowers();

  const [page, setPage] = useState<number>(0);
  const [followers, setFollowers] = useState<IUser[]>([]);
  const { ref, inView } = useInView();
  const [totalFollowers, setTotalFollowers] = useState<number>();
  const [totalFollowerNumberFetched, setTotalFollowerNumberFetched] =
    useState<boolean>(false);

  const { getTotalFollowers } = useGetTotalFollowersAndFollowing();
  const [allFollowerLoaded, setAllFollowersLoaded] = useState<boolean>(false);

  const loadMoreFollowers = async () => {
    const nextPage = page + 1;
    const newUsers = await getUserFollowers(params.userId, nextPage);
    console.log(followers.length, totalFollowers);

    if (followers.length === totalFollowers) {
      setAllFollowersLoaded(prev => true);
    } else {
      setFollowers(prev => [...prev, ...newUsers]);
      setPage(nextPage);
    }
  };

  useEffect(() => {
    if (followers.length === totalFollowers) {
      setAllFollowersLoaded(prev => true);
    }
  }, [followers]);

  useEffect(() => {
    console.log(allFollowerLoaded);
    if (totalFollowerNumberFetched) {
      if (inView) {
        loadMoreFollowers();
      }
    }
  }, [inView, totalFollowerNumberFetched]);

  const getTotalFollowingData = async () => {
    const result = await getTotalFollowers(params.userId);
    setTotalFollowers(result.followerCount);
    setTotalFollowerNumberFetched(prev => true);
  };

  useEffect(() => {
    getTotalFollowingData();
  }, []);
  return (
    <div className='w-full flex justify-center'>
      <div className='md:w-[60%] w-[95%]'>
        <h2 className='font-black text-[25px] mx-2 text-center py-2'>Your followers</h2>
        <div>
          {followers?.map((user: IUser) => (
            <UserCard user={user} key={user.followerDetails._id} />
          ))}
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
          href={`/profile/${user.followerDetails._id}`}
          className='flex items-center gap-2 flex-1'
        >
          <Image
            height={55}
            width={55}
            className='object-cover rounded-full aspect-square'
            alt={`Image of ${user.followerDetails.username}`}
            src={user.followerDetails.userProfileImage}
            unoptimized
          />
          <p className=' text-left font-semibold'>{user.followerDetails.username}</p>
        </Link>
        <div className=' '>
          <Button
            className='h-[30px] rounded-full font-bold active:scale-95 hover:bg-primary/50'
            onClick={() => {
              setIsFollowing(prev => !prev);
              if (isFollowing) {
                unFollow(user.followerDetails._id);
              } else {
                follow(user.followerDetails._id);
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
