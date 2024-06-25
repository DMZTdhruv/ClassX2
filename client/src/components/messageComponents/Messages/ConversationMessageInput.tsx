import { useClassXSocketContext } from '@/context/ClassXSocketContext';
import { useConversationMessageContext } from '@/context/ConversationMessageContext';
import useGenerateFileLink from '@/hooks/useGenerateFileLink';
import { useGenerateLink } from '@/hooks/useGenerateLink';
import { checkTypeOfFile } from '@/utils/checkTypeOfFile';
import { SanityAssetDocument, SanityImageAssetDocument } from '@sanity/client';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { GiCancel } from 'react-icons/gi';
import { HiMiniPaperClip } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';

const ConversationMessageInput = ({ userId }: { userId: string }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [userMessage, setUserMessage] = useState<string>('');
  const [typeOfFile, setTypeOfFile] = useState<string>('');

  const [demo, setDemo] = useState<string>('');

  const generateBlobUrl = (file: File) => {
    const blobUrl = URL.createObjectURL(file);
    return blobUrl;
  };

  // hooks
  const { socket } = useClassXSocketContext();
  const { generateUrl, getUrlImageObj } = useGenerateLink();
  const { generateTempVideoUrl, getFile } = useGenerateFileLink();
  const { replyMessage, setReplyMessage } = useConversationMessageContext();

  //image states
  interface IImgFile {
    file: File | undefined;
    blobUrl: string | undefined;
  }
  const [temporaryImageFile, setTemporaryImageFile] = useState<IImgFile>({
    file: undefined,
    blobUrl: undefined,
  });

  // video states
  const [temporaryVideoUrl, setTemporaryVideoUrl] = useState<
    SanityAssetDocument | undefined
  >(undefined);

  const handleUserMessage = (e: any) => {
    setUserMessage(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const sendSocketMessage = () => {
    try {
      if (socket) {
        socket.emit('private_message', { userId, userMessage });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    sendSocketMessage();
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      console.log(files);

      if (files) {
        const fileType = checkTypeOfFile(files[0]);
        if (fileType === 'image') {
          const imgUrl = generateBlobUrl(files[0]);
          setTemporaryImageFile({
            file: files[0],
            blobUrl: imgUrl,
          });
        } else if (fileType === 'video') {
          const tempVideoUrl = await generateTempVideoUrl(e);
          setTemporaryVideoUrl(prev => tempVideoUrl);
        }
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log({ temporaryImageFile, temporaryVideoUrl });
  }, [temporaryVideoUrl, temporaryImageFile]);

  return (
    <form
      className={`flex flex-col p-3 absolute w-full
      bg-[#0E0E0E]/80 backdrop-blur-2xl
      bottom-0
      `}
      onSubmit={handleSendMessage}
    >
      {replyMessage?.repliedUser ? (
        <div className='pl-2 pr-3 py-2  relative'>
          <p className='text-[13px]'>
            Replying to:{' '}
            <span className='font-semibold'>{replyMessage.repliedUser}</span>
          </p>
          <p className='text-[12px] mt-1 mb-2 text-neutral-300'>
            {replyMessage.repliedUserMessage.slice(0, 200)}
            {replyMessage.repliedUserMessage.length > 200 ? '...' : ''}
          </p>
          <button
            className='absolute group top-1 right-3'
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
            <GiCancel
              size={20}
              className='transition-all group-active:scale-[0.9] hover:scale-105'
            />
          </button>
        </div>
      ) : null}
      {temporaryImageFile.file || temporaryVideoUrl?.url ? (
        <div className='h-[100px] w-[100px] p-2 relative'>
          <Image
            // @ts-ignore
            src={temporaryImageFile.blobUrl}
            height={100}
            width={100}
            className='aspect-square object-cover rounded-md'
            alt='user file'
          />
          <button
            className='absolute top-0 right-0'
            onClick={() =>
              setTemporaryImageFile(prev => ({
                file: undefined,
                blobUrl: undefined,
              }))
            }
          >
            <GiCancel size={20} className='bg-neutral-700 rounded-full' />
          </button>
        </div>
      ) : null}
      <div className='relative w-full'>
        <div className='bottom-[26px] h-[20px] w-[20px] absolute left-5 group  '>
          <label className='cursor-pointer'>
            <HiMiniPaperClip className='group-active:scale-90 w-full h-full rotate-[135deg]' />
            <input type='file' className='hidden' onChange={handleFileUpload} />
          </label>
        </div>
        <textarea
          placeholder='Enter your message.'
          onChange={handleUserMessage}
          ref={textAreaRef}
          rows={1}
          className='bg-[#171717] transition-all focus:bg-[#1E1E1E] max-h-[150px] w-full pl-[50px] outline-none focus-visible:ring-0 resize-none md:font-semibold  rounded-[30px] py-[20px] pr-[60px] caret-violet-300'
        />
        <button className='absolute bottom-0 right-2 -translate-y-[50%]  text-neutral-800 group font-semibold'>
          <FaArrowRight className='h-[35px] rounded-full w-[35px] p-[8px] bg-neutral-100 group-hover:bg-neutral-300 group-active:scale-[0.9]' />
        </button>
      </div>
    </form>
  );
};

export default ConversationMessageInput;
