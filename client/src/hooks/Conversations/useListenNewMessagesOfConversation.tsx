'use client';

import { useClassXContext } from '@/context/ClassXContext';
import { useClassXSocketContext } from '@/context/ClassXSocketContext';
import React, { useEffect } from 'react';

const useListenNewMessagesOfConversation = () => {
  const { socket } = useClassXSocketContext();
  const { setConversationChats, conversationChats } = useClassXContext();

  useEffect(() => {
    if (socket) {
      socket.on('private_message_StoC', message => {
        if (message?.receivedMessage) {
          console.log(message?.receivedMessage?.senderId?._id);
          setConversationChats(prev => {
            return prev.map(conversation =>
              conversation._id === message?.receivedMessage?.senderId?._id
                ? {
                    ...conversation,
                    conversationChats: [
                      ...conversation.conversationChats,
                      message?.receivedMessage,
                    ],
                    totalMessagesLoaded: conversation.totalMessagesLoaded + 1,
                  }
                : conversation
            );
          });
          console.log(conversationChats);
        }
      });
    }
  }, [socket]);
};

export default useListenNewMessagesOfConversation;
