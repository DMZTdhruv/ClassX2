'use client';

import { useMessageContext } from '@/context/MessageContext';
import { useClassXSocketContext } from '@/context/ClassXSocketContext';
import { useEffect, useState } from 'react';
const useListenNewMessages = () => {
  const { socket } = useClassXSocketContext();
  const { messages, setMessages } = useMessageContext();

  useEffect(() => {
    // @ts-ignore
    socket?.on('newMessage', newMessage => {
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      socket?.off('newMessage');
    };
  }, [messages, socket, setMessages]);
};

export default useListenNewMessages;
