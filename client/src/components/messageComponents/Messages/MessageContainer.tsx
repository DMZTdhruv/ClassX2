'use client';

import React from 'react';
import { useMessageContext } from '@/context/MessageContext';
import { MessageContextProps } from '@/Constants';
import MessageHeader from './MessageHeader';
import MessageInput from './MessageInput';
import MessagesTwo from './MessagesTwo';
import ImageModal from '@/components/shared/ImageModal';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';

const MessageContainer = () => {
  const { conversation, asset, setAsset } = useMessageContext();
  return (
    <div
      className={`flex-1 sm:pl-[100px] lg:pl-[0]  ${
        conversation ? 'scale-100' : 'scale-75 sm:scale-100'
      } messageConversation h-screen transition-all`}
    >
      {!conversation ? (
        <div className='h-screen flexCenter '>
          Send a message to start a conversation
        </div>
      ) : (
        <>
          <div className='flex relative transition-all flex-col h-screen max-h-screen overflow-y-hidden w-full'>
            {asset && (
              <div className='fixed z-[10000] max-h-screen py-8 flex items-center justify-center overflow-y-auto w-full inset-0 bg-black/80'>
                <Image
                  src={asset}
                  height={150}
                  width={150}
                  className='h-auto w-auto min-w-[60%] object-contain max-h-[80%] max-w-[80%] rounded-md'
                  alt='Image'
                  unoptimized
                />
                <button
                  className='absolute  top-[5%] right-[5%]'
                  onClick={() => setAsset('')}
                >
                  <RxCross2 size={28} />
                </button>
              </div>
            )}
            <MessageHeader userDetails={conversation} />
            <MessagesTwo />
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;
