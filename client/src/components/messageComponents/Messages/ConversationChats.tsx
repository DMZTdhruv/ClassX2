'use client';

import { MessageIsLoadingUiSkeleton } from '@/components/Skeletons/MessageChatSkeleton';
import { useClassXContext } from '@/context/ClassXContext';
import useGetConversationsMessages from '@/hooks/Conversations/useGetConversationsMessages';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ConversationChatBubble from './ConversationChatBubble';
import { useInView } from 'react-intersection-observer';
import { yearsToQuarters } from 'date-fns';
import { useAuthContext } from '@/context/AuthContext';
import useSendConversationMessage from '@/hooks/Message/useSendConversationMessage';

interface IConversationChatSection {
  userId: string;
}

const ConversationChatSection = ({ userId }: IConversationChatSection) => {
  // hooks
  const { getTotalCurrentConversationMessages, getMessages } =
    useGetConversationsMessages();

  // states
  const [loadingConversation, setLoadingConversation] = useState<boolean>(false);
  //refs
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView();
  const { ref: lastMessageRefRef, inView: lastMessageInView } = useInView();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // contexts
  const { authUser } = useAuthContext();
  const { conversationChats, setConversationChats } = useClassXContext();
  const currentConversationUser = conversationChats.find(user => user._id === userId);

  //socket handler for new message
  const handleNewMessageOfSocket = () => {};

  const initializeTheTotalNumberOfMessage = async () => {
    try {
      const numberOfMessages = await getTotalCurrentConversationMessages(userId);
      setConversationChats(prev => {
        return prev.map(conversation =>
          conversation._id === userId
            ? { ...conversation, totalMessages: numberOfMessages }
            : conversation
        );
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const initializeTheConversationMessages = async () => {
    try {
      const messages = await getMessages(1, userId);
      setConversationChats(prev => {
        return prev.map(conversation =>
          conversation._id === userId
            ? {
                ...conversation,
                conversationChats: [...messages],
                totalMessagesLoaded: messages.length - 1,
              }
            : conversation
        );
      });
    } catch (error: any) {
      console.error(`Failed to get the conversation messages: ${error.message}`);
    }
  };

  const loadPreviousMessages = async () => {
    try {
      if (currentConversationUser) {
        const nextPage = currentConversationUser.page + 1;
        const previousMessages = await getMessages(nextPage, userId);
        setConversationChats(prev => {
          return prev.map(conversation =>
            conversation._id === userId
              ? {
                  ...conversation,
                  conversationChats: [
                    ...previousMessages,
                    ...conversation.conversationChats,
                  ],
                  totalMessagesLoaded:
                    conversation.totalMessagesLoaded + previousMessages.length,
                  page: nextPage,
                }
              : conversation
          );
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const initializeTheConversationData = async () => {
    setLoadingConversation(true);
    const currentUser = conversationChats.find(user => user._id === userId);
    if (currentUser?.totalMessages === 0) {
      await initializeTheTotalNumberOfMessage();
    }
    if (currentUser?.totalMessagesLoaded == 0) {
      await initializeTheConversationMessages();
    }
    setLoadingConversation(false);
  };

  useEffect(() => {
    if (lastMessageInView) {
      console.log(lastMessageInView);
    }
  }, [lastMessageInView]);

  useEffect(() => {
    if (userId) {
      initializeTheConversationData();
    }
  }, [userId]);

  useEffect(() => {
    if (inView && currentConversationUser) {
      loadPreviousMessages();
    }
  }, [inView]);

  useEffect(() => {
    if (lastMessageRef.current && scrollContainerRef.current) {
      lastMessageRef.current.scrollIntoView({ block: 'center' });
    }
  }, [userId, loadingConversation]);

  useEffect(() => {
    const currentChat = conversationChats.find(user => user._id === userId);
    const lastMessage =
      currentChat?.conversationChats[currentChat?.conversationChats.length - 1];
    const isUserMessage = lastMessage?.senderId?._id === authUser?.userProfileId;

    console.log({ messageSenderId: lastMessage?.senderId?._id, userId });

    if (isUserMessage) {
      lastMessageRef.current?.scrollIntoView({ block: 'center' });
    } else if (lastMessageInView) {
      lastMessageRef.current?.scrollIntoView({ block: 'center' });
    }
  }, [conversationChats]);

  const previousPosition = useRef<number>(0);
  const newPosition = useRef<number>(0);

  useLayoutEffect(() => {
    const currentChat = conversationChats.find(user => user._id === userId);
    const lastMessage =
      currentChat?.conversationChats[currentChat?.conversationChats.length - 1];
    const isUserMessage = lastMessage?.senderId?._id === authUser?.userProfileId;

    if (
      scrollContainerRef.current &&
      currentConversationUser &&
      !lastMessageInView &&
      !isUserMessage
    ) {
      previousPosition.current = newPosition.current;
      newPosition.current = scrollContainerRef.current.scrollHeight;
      if (currentConversationUser.page > 1) {
        scrollContainerRef.current.scrollTo(
          0,
          newPosition.current - previousPosition.current
        );
      }
    }
  }, [currentConversationUser?.conversationChats]);

  useEffect(() => {
    console.log(currentConversationUser?.conversationChats);
  }, [currentConversationUser?.conversationChats]);

  return (
    <div className='flex-1 w-full overflow-y-auto ' ref={scrollContainerRef}>
      {loadingConversation ? (
        <MessageIsLoadingUiSkeleton />
      ) : (
        <div className='flex flex-col w-full gap-3 py-[90px] p-2 '>
          {currentConversationUser && (
            <div className='w-full justify-center flex animate-in fade-in-0'>
              {currentConversationUser?.totalMessagesLoaded + 1 >=
              currentConversationUser?.totalMessages ? (
                <p>Congratulations 🎉 you have checked all the messages!!</p>
              ) : (
                <div className='loader my-3 text-center' ref={ref}></div>
              )}
            </div>
          )}
          {conversationChats
            .find(conversation => conversation._id === userId)
            ?.conversationChats.map(messages => {
              return (
                <div ref={lastMessageRef} key={messages._id}>
                  <ConversationChatBubble chatData={messages} key={messages._id} />
                </div>
              );
            })}
          <div ref={lastMessageRefRef}></div>
        </div>
      )}
    </div>
  );
};

export default ConversationChatSection;
