'use client';

import { IConversationMessage, IMessageUser, IPost } from '@/Constants';
import React, { createContext, useContext, useState } from 'react';

interface IClassXContext {
  explorePost: IPost[];
  setExplorePost: React.Dispatch<React.SetStateAction<IPost[] | []>>;
  userPost: IPost[];
  setUserPost: React.Dispatch<React.SetStateAction<IPost[] | []>>;
  savedPost: IPost[];
  setSavedPost: React.Dispatch<React.SetStateAction<IPost[] | []>>;
  feedPost: IPost[];
  setFeedPost: React.Dispatch<React.SetStateAction<IPost[] | []>>;
  totalPostDeleted: number;
  setTotalPostDeleted: React.Dispatch<React.SetStateAction<number>>;
  suggestedUserList: [];
  setSuggestedUserList: React.Dispatch<React.SetStateAction<[]>>;
  followers: IUser[];
  setFollowers: React.Dispatch<React.SetStateAction<IUser[] | []>>;
  followings: IUser[];
  setFollowings: React.Dispatch<React.SetStateAction<IUser[] | []>>;
  conversationUsers: IMessageUser[];
  setConversationUsers: React.Dispatch<React.SetStateAction<IMessageUser[] | []>>;
  conversationChats: IConversationMessage[];
  setConversationChats: React.Dispatch<React.SetStateAction<IConversationMessage[]>>;
}

interface IUser {
  _id: string;
  userProfileImage: string;
  username: string;
}

export const ClassXContext = createContext<IClassXContext | undefined>(undefined);

export const ClassXContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [explorePost, setExplorePost] = useState<IPost[]>([]);
  const [userPost, setUserPost] = useState<IPost[]>([]);
  const [savedPost, setSavedPost] = useState<IPost[]>([]);
  const [feedPost, setFeedPost] = useState<IPost[]>([]);
  const [totalPostDeleted, setTotalPostDeleted] = useState<number>(0);

  //conversation states
  const [conversationUsers, setConversationUsers] = useState<IMessageUser[]>([]);
  const [conversationChats, setConversationChats] = useState<IConversationMessage[]>(
    []
  );

  const [followers, setFollowers] = useState<IUser[]>([]);
  const [followings, setFollowings] = useState<IUser[]>([]);

  const [suggestedUserList, setSuggestedUserList] = useState<[]>([]);

  return (
    <ClassXContext.Provider
      value={{
        feedPost,
        setFeedPost,
        explorePost,
        setExplorePost,
        userPost,
        setUserPost,
        savedPost,
        setSavedPost,
        totalPostDeleted,
        setTotalPostDeleted,
        suggestedUserList,
        setSuggestedUserList,
        followers,
        setFollowers,
        followings,
        setFollowings,
        conversationUsers,
        setConversationUsers,
        conversationChats,
        setConversationChats,
      }}
    >
      {children}
    </ClassXContext.Provider>
  );
};

export const useClassXContext = () => {
  const classXContext = useContext(ClassXContext);
  if (!classXContext) {
    throw new Error('useClassXContext must be used within a ClassXContextProvider');
  }
  return classXContext;
};

export default ClassXContextProvider;
