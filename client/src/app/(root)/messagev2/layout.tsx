'use client';

import MessageConversationContainer from '@/components/messageComponents/Messages/MessageConversationContainer';
import ConversationMessageContextProvider from '@/context/ConversationMessageContext';
import useListenNewMessagesOfConversation from '@/hooks/Conversations/useListenNewMessagesOfConversation';
import { usePathname } from 'next/navigation';
import React from 'react';

const MessageV2Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isConversationOpen = pathname.endsWith('/messagev2');
  useListenNewMessagesOfConversation();
  return (
    <ConversationMessageContextProvider>
      <div
        className={`flex transition-transform  relative overflow-x-hidden  ${
          !isConversationOpen ? 'sm:translate-x-0 ' : 'translate-x-0'
        }`}
      >
        <MessageConversationContainer />
        {children}
      </div>
    </ConversationMessageContextProvider>
  );
};

export default MessageV2Layout;
