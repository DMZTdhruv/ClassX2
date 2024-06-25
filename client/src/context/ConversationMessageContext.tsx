import { IReplyMessage } from '@/Constants';
import React, { createContext, useContext, useState } from 'react';

interface IConversationMessageContext {
  replyMessage: IReplyMessage;
  setReplyMessage: React.Dispatch<React.SetStateAction<IReplyMessage>>;
  setAsset: React.Dispatch<React.SetStateAction<string>>;
  asset: string;
}

export const ConversationMessageContext = createContext<
  IConversationMessageContext | undefined
>(undefined);

export const useConversationMessageContext = () => {
  const context = useContext(ConversationMessageContext);
  if (!context) {
    throw new Error(
      'useConversationMessageContext must be used within a ConversationMessageContextProvider'
    );
  }

  return context;
};

const ConversationMessageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [asset, setAsset] = useState<string>('');
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

  const value = { asset, setAsset, replyMessage, setReplyMessage };

  return (
    <ConversationMessageContext.Provider value={value}>
      {children}
    </ConversationMessageContext.Provider>
  );
};

export default ConversationMessageContextProvider;
