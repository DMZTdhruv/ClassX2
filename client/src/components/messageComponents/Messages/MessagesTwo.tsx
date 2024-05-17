'use client';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import useListenNewMessages from '@/hooks/Conversations/useListenNewMessages';
import { useMessageContext } from '@/context/MessageContext';
import { useInView } from 'react-intersection-observer';
import useGetMessagesTwo from '@/hooks/Conversations/useGetMessagesTwo';
import { useDeleteMessage } from '@/hooks/Message/useDeleteMessage';
import { useSocketContext } from '@/context/SocketContext';
import { useAuthContext } from '@/context/AuthContext';
import { FaArrowDown } from 'react-icons/fa6';
import { MessageIsLoadingUiSkeleton } from '@/components/Skeletons/MessageChatSkeleton';

interface PostDetails {
  _id: string;
  originalFilename: string;
  url: string;
  extension: string;
  _createdAt: string;
}

interface MessageProps {
  _id: string;
  senderId: { userProfileImage: string; username: string; _id: string };
  receiverId: { userProfileImage: string; username: string; _id: string };
  replyMessage: {
    repliedMessageId: string;
    replyMessage: string;
    replyToUsername: string;
  };
  post: {
    _id: string;
    attachments: PostDetails[];
    caption: string;
    postedBy: {
      _id: string;
      userProfileImage: string;
      username: string;
    };
    aspectRatio: string;
  };
  message: string;
  createdAt: string;
}

const MessagesTwo = () => {
  // Custom hooks
  useListenNewMessages();
  const { getMessages, getTotalMessages } = useGetMessagesTwo();
  const { authUser } = useAuthContext();
  const { messages, setMessages, conversation } = useMessageContext();
  const { socket } = useSocketContext();
  const { loading, deleteMessage: messageDelete } = useDeleteMessage();

  // State variables
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const [previousMessages, setPreviousMessages] = useState<MessageProps[]>([]);
  const [allMessagesReceived, setAllMessageReceived] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [previousMessageIndex, setPreviousMessageIndex] = useState<number>(0);
  const [newMessageArrived, setNewMessagesArrived] = useState<boolean>(false);
  const [newMessages, setNewMessages] = useState<MessageProps[]>([]);
  const isMessageDeletingRef = useRef(false);
  const [totalNumberOfMessagesDeleted, setTotalNumberOfMessagesDeleted] =
    useState<number>(0);

  // Refs
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView();
  const [ref2, inView2] = useInView();
  const firstRender = useRef(true);
  const lastPreviousMessageRef = useRef<HTMLDivElement[]>([]);

  // use Effects
  useEffect(() => {
    getConversationTotalMessageCount();
  }, [conversation]);

  useEffect(() => {
    socket?.on('deletedMessage', deleteMessageId => {
      isMessageDeletingRef.current = true;
      setTotalNumberOfMessagesDeleted(prev => prev + 1);
      setMessages(prev => prev.filter(message => message._id !== deleteMessageId));
      setTimeout(() => {
        isMessageDeletingRef.current = false;
      }, 2000);
    });

    return () => {
      socket?.off('deletedMessage');
    };
  }, [socket, messages]);

  // Scroll down when the user sends a message
  useEffect(() => {
    if (
      lastMessageRef.current &&
      !isMessageDeletingRef.current &&
      !firstRender.current &&
      messages[messages.length - 1].senderId === authUser?.userProfileId
    ) {
      lastMessageRef.current.scrollIntoView({ block: 'center' });
    }
  }, [messages]);

  // Scroll down on the first render
  useEffect(() => {
    if (
      lastMessageRef.current &&
      firstRender.current &&
      !isMessageDeletingRef.current
    ) {
      lastMessageRef.current.scrollIntoView({ block: 'center' });
      firstRender.current = false;
    }
  }, [messages]);

  // Load previous messages when the user scrolls up
  useEffect(() => {
    if (inView) {
      loadPreviousMessages();
    }
  }, [inView]);

  // Keep scroll on top when new messages are loaded
  useEffect(() => {
    if (previousMessageIndex === 0 || page === 0 || previousMessages?.length === 0)
      return;
    lastPreviousMessageRef.current[previousMessageIndex - 1].scrollIntoView({
      block: 'start',
    });
  }, [page]);

  // Check if all messages are received

  useEffect(() => {
    setAllMessageReceived(
      previousMessages?.length + messages.length >=
        totalMessages - totalNumberOfMessagesDeleted
    );
  }, [messages, previousMessages]);

  // Handle new message received and allow users to scroll down
  useEffect(() => {
    if (inView2 && lastMessageRef.current && !isMessageDeletingRef.current) {
      setNewMessagesArrived(false);
      setNewMessages([]);
    }
  }, [inView2, messages]);

  useEffect(() => {
    if (inView2 && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ block: 'center' });
    }
  }, [messages, inView2]);

  useEffect(() => {
    if (lastMessageRef.current) {
      if (
        messages[messages.length - 1].senderId === authUser?.userProfileId &&
        !isMessageDeletingRef.current
      ) {
        lastMessageRef.current.scrollIntoView({ block: 'center' });
      }
    }
  }, [messages]);

  // Handle button state
  useEffect(() => {
    if (lastMessageRef.current) {
      if (
        messages[messages.length - 1].senderId !== authUser?.userProfileId &&
        !inView2
      ) {
        setNewMessagesArrived(true);
      }
    }
  }, [inView2, messages]);

  // Count new messages
  useEffect(() => {
    if (lastMessageRef.current) {
      if (
        !inView2 &&
        !isMessageDeletingRef.current &&
        messages[messages.length - 1].senderId !== authUser?.userProfileId
      ) {
        setNewMessagesArrived(true);
        setNewMessages(prev => [...prev, messages[messages.length - 1]]);
      }
    }
  }, [inView2, messages]);

  // Scroll down handler
  const scrollDown = () => {
    if (lastMessageRef.current && !isMessageDeletingRef.current) {
      lastMessageRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  // Load previous messages handler
  const loadPreviousMessages = async () => {
    const nextPage = page + 1;
    const conversationPreviousMessages = await getMessages(nextPage);
    setPreviousMessageIndex(conversationPreviousMessages?.length);
    setPreviousMessages(prev => [...conversationPreviousMessages, ...prev]);
    setPage(nextPage);
  };

  // Get conversation total message count handler
  const getConversationTotalMessageCount = async () => {
    setIsLoading(true);
    setMessages([]);
    setPreviousMessages([]);
    setTotalMessages(0);
    setPage(1);
    setTotalNumberOfMessagesDeleted(0);
    const totalCount = await getTotalMessages();
    setTotalMessages(totalCount);
    const messages = await getMessages(1);
    setMessages(messages);
    setIsLoading(false);
    setAllMessageReceived(previousMessages?.length >= totalMessages);
    firstRender.current = true;
  };

  // Delete message handler
  const deleteMessage = async (_id: string, messageType: string) => {
    isMessageDeletingRef.current = true;
    if (messageType === 'current') {
      try {
        await messageDelete(_id, conversation._id);
        setMessages(prev => prev.filter(message => message._id !== _id));
        setTotalNumberOfMessagesDeleted(prev => prev + 1);
      } catch (error: any) {
        console.error('error ' + error.message);
        setTotalNumberOfMessagesDeleted(prev => prev - 1);
      } finally {
        setTimeout(() => {
          isMessageDeletingRef.current = false;
        }, 500);
      }
    } else if (messageType === 'previous') {
      try {
        await messageDelete(_id, conversation._id);
        setPreviousMessages(prev => prev.filter(message => message._id !== _id));
        socket?.emit('deletePreviousMessage', {
          deletePreviousMessageId: _id,
        });
        setTotalNumberOfMessagesDeleted(prev => prev + 1);
      } catch (error: any) {
        console.error(error.message);
        setTotalNumberOfMessagesDeleted(prev => prev - 1);
      }
    }
  };

  return (
    <div className={`p-2 flex-1 border-y border-neutral-800 overflow-y-auto`}>
      {isLoading ? (
        <MessageIsLoadingUiSkeleton />
      ) : (
        <div className='flex gap-3 relative flex-col'>
          {totalMessages === 0 && (
            <p className='text-center my-5'>
              Enter a message to start the conversation ⭐
            </p>
          )}

          {totalMessages > 0 && (
            <div className='w-full justify-center flex animate-in fade-in-0'>
              {allMessagesReceived || messages.length === totalMessages ? (
                <p className='my-5'>
                  Congratulations 🎉 you have checked all the messages!!
                </p>
              ) : (
                <div className='loader my-3' ref={ref}></div>
              )}
            </div>
          )}

          {previousMessages?.length > 0 && (
            <div className='flex flex-col gap-3 w-full'>
              {previousMessages?.map((message: MessageProps, index: number) => (
                <div
                  key={message._id}
                  ref={el => {
                    if (el) {
                      lastPreviousMessageRef.current[index] = el;
                    }
                  }}
                >
                  <Message
                    message={message}
                    deleteMessage={{ deleteMessage, loading }}
                    messageType='previous'
                  />
                </div>
              ))}
            </div>
          )}

          {messages?.length > 0 && (
            <div className='flex flex-col gap-3 w-full'>
              {messages?.map((message: MessageProps, index: number) => (
                <div
                  key={message._id}
                  ref={index === messages?.length - 1 ? lastMessageRef : null}
                >
                  <div ref={ref2}>
                    <Message
                      message={message}
                      deleteMessage={{ deleteMessage, loading }}
                      messageType='current'
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {newMessageArrived && newMessages.length - 1 > 0 && (
            <button
              onClick={scrollDown}
              className='fixed flex animate-bounce items-center justify-center bg-neutral-800 border-neutral-900 border w-8 h-8 rounded-full bottom-[120px] right-[5%]'
            >
              <div className='relative flex justify-center items-center h-full w-full'>
                <span className='absolute top-[-6px] right-[-3px] p-[3px] inline-block rounded-full bg-neutral-800 border-neutral-900 font-bold'>
                  {newMessages.length - 1}
                </span>
                <FaArrowDown />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MessagesTwo;
