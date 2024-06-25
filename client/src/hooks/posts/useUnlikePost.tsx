import { Api } from '@/Constants';
import { useClassXContext } from '@/context/ClassXContext';
import React, { SetStateAction } from 'react';

const useUnlikePost = () => {
  const { feedPost, setFeedPost } = useClassXContext();
  const unlikePost = async (
    _id: string,
    index: number,
    setNumberOfLikes: React.Dispatch<SetStateAction<number>>,
    numberOfLikes: number,
    isLiked: boolean,
    setIsLiked: React.Dispatch<SetStateAction<boolean>>,
    authUser: { userProfileId: string },
    serverRendered: boolean
  ) => {
    setNumberOfLikes(prev => prev - 1);
    if (!serverRendered) {
      setFeedPost(prev => {
        const posts = [...prev];
        posts[index].likes = posts[index].likes.filter(
          like => like !== authUser.userProfileId
        );
        return posts;
      });
    }

    try {
      const res = await fetch(`${Api}/post/unlike-post/${_id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error: any) {
      setNumberOfLikes(numberOfLikes);
      console.error(error.message);
      if (!serverRendered) {
        setFeedPost(prev => {
          const posts = [...prev];
          posts[index].likes.push(authUser.userProfileId);
          return posts;
        });
      }

      setIsLiked(true);
    }
  };

  return { unlikePost };
};

export default useUnlikePost;
