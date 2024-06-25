import { Api } from '@/Constants';
import React, { useState } from 'react';

const useGetTotalFollowersAndFollowing = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getTotalFollowers = async (userProfileId: string) => {
    try {
      const res = await fetch(`${Api}/users/${userProfileId}/total-followers`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data.data;
    } catch (error: any) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      console.log(error);
    }
  };

  const getTotalFollowings = async (userProfileId: string) => {
    try {
      const res = await fetch(`${Api}/users/${userProfileId}/total-followings`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data.data;
    } catch (error: any) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      console.log(error);
    }
  };

  return { getTotalFollowers, getTotalFollowings, errorMessage };
};

export default useGetTotalFollowersAndFollowing;
