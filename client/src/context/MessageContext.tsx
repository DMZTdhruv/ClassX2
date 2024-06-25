'use client';

import { IReplyMessage } from '@/Constants';
import React, { createContext, useContext, useState } from 'react';

interface MessageContextProps {
  conversation: any;
  setConversation: React.Dispatch<React.SetStateAction<any>>;
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  replyMessage: IReplyMessage;
  setReplyMessage: React.Dispatch<React.SetStateAction<IReplyMessage>>;
  setAsset: React.Dispatch<React.SetStateAction<string>>;
  asset: string;
}
export const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const useMessageContext = () => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error('useMessageContext must be used within a MessageContextProvider');
  }

  return context;
};

const MessageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversation, setConversation] = useState(null);
  const [asset, setAsset] = useState<string>('');

  const [messages, setMessages] = useState<any[]>([]);
  const [replyMessage, setReplyMessage] = useState<IReplyMessage>({
    repliedUser: '',
    repliedUserMessage: '',
    repliedPost: {
      postId: '',
      postUrl: '',
      extension: '',
    },
    repliedAsset: {
      extension: '',
      url: '',
    },
  });

  const value = {
    conversation,
    setConversation,
    messages,
    setReplyMessage,
    replyMessage,
    setMessages,
    asset,
    setAsset,
  };

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};

export default MessageContextProvider;
