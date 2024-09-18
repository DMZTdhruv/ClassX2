'use client';

import CustomTextArea from '@/components/shared/ChatComponents/CustomTextArea';
import { useMessageContext } from '@/context/MessageContext';
import useSendMessage from '@/hooks/Conversations/useSendMessage';
import { RxCross2 } from 'react-icons/rx';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { HiMiniPaperClip } from 'react-icons/hi2';
import { FaArrowRight } from 'react-icons/fa';
import { SanityAssetDocument, SanityUser } from '@sanity/client';
import { useGenerateLink } from '@/hooks/useGenerateLink';
import useGenerateFileLink from '@/hooks/useGenerateFileLink';
import { Button } from '@/components/ui/button';
import { BsFiletypeDocx, BsFiletypePdf, BsFiletypePpt } from 'react-icons/bs';
import Link from 'next/link';
import { GiCancel } from 'react-icons/gi';

const MessageInput = () => {
  const { sendMessage } = useSendMessage();
  const [sendingMessageLoading, setSendingMessageLoading] = useState<boolean>(false);
  const [assetLoading, setAssetLoading] = useState<boolean>(false);
  // asset states
  const [asset, setAsset] = useState<SanityAssetDocument | undefined>(undefined);
  const { generateUrl, getUrl, getUrlImageObj } = useGenerateLink();
  const { getFile, generateTempFileUrl, generateTempVideoUrl } = useGenerateFileLink();
  const [type, setType] = useState<string>('');

  // error states
  const [error, setError] = useState<string>('');

  // message state
  const [message, setMessage] = useState<string>('');
  const { replyMessage, setReplyMessage } = useMessageContext();
  const [temporaryAttachmentUrl, setTemporaryAttachmentUrl] = useState<
    SanityAssetDocument | undefined
  >(undefined);

  const getTemporaryUrl = async (e: FormEvent<HTMLInputElement>) => {
    try {
      const inputTarget = e.target as HTMLInputElement;
      setAssetLoading(true);
      if (inputTarget.files) {
        const file = inputTarget.files;
        const typeOfFile = checkTypeOfFile(file[0]);
        if (typeOfFile === 'image') {
          const temporaryImageUrl = await generateUrl(e);
          setTemporaryAttachmentUrl(temporaryImageUrl);
        } else if (typeOfFile === 'video') {
          const temporaryVideoUrl = await generateTempVideoUrl(e);
          setTemporaryAttachmentUrl(temporaryVideoUrl);
        } else if (typeOfFile === 'file') {
          const file = await generateTempFileUrl(e);
          setTemporaryAttachmentUrl(file);
        }
      }
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 2000);
    } finally {
      setAssetLoading(false);
    }
  };

  const checkTypeOfFile = (file: File) => {
    const { type } = file;
    if (
      type === 'image/jpeg' ||
      type === 'image/png' ||
      type === 'image/gif' ||
      type === 'image/svg+xml' ||
      type === 'image/webp'
    ) {
      setType('Image');
      return 'image';
    } else if (
      type === 'application/pdf' ||
      type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      type === 'application/vnd.ms-powerpoint'
    ) {
      setType('File');
      return 'file';
    } else if (type === 'video/mp4') {
      setType('Video');
      return 'video';
    } else {
      throw new Error('File type is not supported');
    }
  };

  const sendSocketMessage = () => {
    try {
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') {
      return;
    }

    setSendingMessageLoading(true);
    let asset: SanityAssetDocument | undefined = undefined;
    if (temporaryAttachmentUrl?.url) {
      if (type === 'Image') {
        asset = await getUrlImageObj(temporaryAttachmentUrl);
      } else if (type === 'File') {
        asset = await getFile(temporaryAttachmentUrl);
      } else if (type === 'Video') {
        asset = await getFile(temporaryAttachmentUrl);
      } else {
        asset = undefined;
      }
    }

    await sendMessage(message, asset);
    setMessage('');
    setTemporaryAttachmentUrl(undefined);
    setSendingMessageLoading(false);
  };

  return (
    <form
      className={`${
        temporaryAttachmentUrl || replyMessage.repliedUser?.length !== 0
          ? 'px-3 pb-3'
          : 'p-3'
      } 
      transition-all absolute lg:min-w-full w-full bottom-0  bg-[#0E0E0E]/50 backdrop-blur-md `}
      onSubmit={handleSendMessage}
    >
      {replyMessage?.repliedUser?.length !== 0 ? (
        <div
          className={`text-[12px] pt-3 pl-2 animate-in fade-in-0  ${
            temporaryAttachmentUrl || assetLoading
              ? 'border-b border-neutral-700 pb-2 px-3'
              : 'mb-3 '
          } relative`}
        >
          <span>Replying to: </span> <strong>{replyMessage.repliedUser}</strong>
          <br />
          <span className='opacity-70'>
            {replyMessage.repliedUserMessage.slice(0, 100)}
          </span>
          {replyMessage.repliedPost.postUrl !== '' && (
            <div className='max-w-[85px]  object-cover aspect-square'>
              {replyMessage.repliedPost.extension === 'mp4' ? (
                <video
                  src={replyMessage.repliedPost.postUrl}
                  muted={false}
                  preload='false'
                  className={` w-full min-w-[85px] aspect-square  object-cover max-w-[85px] transition-all `}
                ></video>
              ) : (
                <Image
                  src={replyMessage.repliedPost.postUrl}
                  alt='image'
                  width={300}
                  height={0}
                  style={{ height: 'auto', width: '300' }}
                  className={`max-w-[85px] animate-in fade-in-0 aspect-square object-cover min-w-[85px]`}
                />
              )}
            </div>
          )}
          {replyMessage.repliedUserMessage.length > 100 ? '...' : ''}
          <button
            className='absolute transition-all hover:scale-[1.1] right-2 top-2 active:scale-[0.9]'
            onClick={() => {
              setReplyMessage({
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
            }}
          >
            <RxCross2 size={20} />
          </button>
        </div>
      ) : null}

      {(temporaryAttachmentUrl || assetLoading) && (
        <div className='relative animate-in fade-in-0'>
          {assetLoading ? (
            <p className='p-2 pl-2 font-semibold animate-pulse'>Uploading...</p>
          ) : (
            <div className='flex items-start flex-col gap-2 px-2 pt-2 pb-3'>
              <p className='font-semibold '>
                You are sharing <span className='glowText'>{type}</span>{' '}
              </p>
              {type === 'Image' && (
                <Image
                  src={temporaryAttachmentUrl?.url || 'image'}
                  alt='image'
                  width={300}
                  height={0}
                  style={{ height: 'auto', width: '300' }}
                  className={`md:max-w-[300px] w-auto max-w-[250px] rounded-md object-contain max-h-[200px]`}
                  unoptimized
                />
              )}

              {type === 'Video' && (
                <video
                  src={temporaryAttachmentUrl?.url || 'image'}
                  style={{ height: 'auto', width: '300' }}
                  autoPlay
                  muted
                  loop
                  className={`md:max-w-[300px] w-auto max-w-[250px] rounded-md object-contain max-h-[200px]`}
                ></video>
              )}

              {type === 'File' && (
                <div className='flex flex-col relative gap-2 justify-between p-4 bg-neutral-900 rounded-lg'>
                  <div className='text-left'>
                    <h3 className='text-xl font-medium text-wrap'>
                      {temporaryAttachmentUrl?.originalFilename?.slice(0, 35)}
                      {/* @ts-ignore */}
                      {temporaryAttachmentUrl?.originalFilename?.length > 35 && '...'}
                    </h3>
                    <p className='text-sm text-neutral-200'>
                      {temporaryAttachmentUrl?.extension.toUpperCase()} document
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    {(temporaryAttachmentUrl?.extension === 'pptx' ||
                      temporaryAttachmentUrl?.extension === 'ppt') && (
                      <BsFiletypePpt fill='#FFAF45' size={24} />
                    )}
                    {temporaryAttachmentUrl?.extension === 'docx' && (
                      <BsFiletypeDocx fill='#5BBCFF' size={24} />
                    )}
                    {temporaryAttachmentUrl?.extension === 'pdf' && (
                      <BsFiletypePdf fill='#FF204E' size={24} />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className='relative flex justify-center items-center '>
        {!temporaryAttachmentUrl?.url && (
          <label
            className={`group
          ${assetLoading ? 'animate-pulse' : null}
          cursor-pointer absolute translate-y-[-110%] left-[20px] bottom-0 rotate-[-224deg] h-[20px] w-[20px]`}
          >
            <HiMiniPaperClip
              className=' group-active:scale-90 '
              style={{ height: '100%', width: '100%' }}
            />
            <input
              type='file'
              disabled={sendingMessageLoading || assetLoading}
              onChange={getTemporaryUrl}
              className='h-0 w-0 hidden'
            />
          </label>
        )}
        {temporaryAttachmentUrl?.url && (
          <button
            className='group cursor-pointer absolute translate-y-[-40%] rounded-full text-white hover:text-red-500 transition-all left-[10px] bottom-0 h-[35px] w-[35px] flex items-center justify-center'
            onClick={() => {
              setTemporaryAttachmentUrl(undefined);
              setType('');
            }}
          >
            <span className='group-active:scale-75 transition-all'>
              <GiCancel size={25} />
            </span>
          </button>
        )}
        <CustomTextArea
          placeholder='Write something...'
          className={`bg-[#171717] max-h-[150px] w-full pl-[50px] outline-none focus-visible:ring-0 resize-none md:font-semibold border-none   rounded-[30px] py-[20px] pr-[60px] caret-violet-300
           
          `}
          value={message}
          onChange={e => {
            setMessage(e.target.value);
          }}
        />

        <button
          className={`absolute ${
            sendingMessageLoading && 'animate-pulse opacity-25'
          } w-auto h-auto bottom-0 translate-y-[-35%] right-3 text-neutral-800 font-semibold`}
          disabled={assetLoading || sendingMessageLoading}
        >
          <FaArrowRight className='h-[35px] rounded-full w-[35px] p-[8px] bg-neutral-100' />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
