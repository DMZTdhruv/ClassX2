import { Api } from '@/Constants';
import React, { useState } from 'react';

interface MessageDetails {
  receiverIds: string[];
  textMessage: string;
  postId: string;
}

const useSendPost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const sendPost = async (messageDetails: MessageDetails) => {
    try {
      setLoading(true);
      const res = await fetch(`${Api}/post/send-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageDetails }),
        credentials: 'include',
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMessage, sendPost };
};

export default useSendPost;
