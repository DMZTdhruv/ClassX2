import { Api } from '@/Constants';
import { useState } from 'react';

const useGetSuggestedUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getSuggestedUser = async (userProfileId: string) => {
    setLoading(true);
    const userProfileApi = `${Api}/users/suggestedUsers`;
    try {
      const response = await fetch(userProfileApi, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data.data;
    } catch (err: any) {
      console.error(err.message);
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return { getSuggestedUser, loading, errorMessage };
};

export default useGetSuggestedUser;
