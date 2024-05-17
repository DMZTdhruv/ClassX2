import { webUrl } from '@/Constants';
import { useAuthContext } from '@/context/AuthContext';
import { useMessageContext } from '@/context/MessageContext';
import { DetailedMessageTime, messageTime } from '@/utils/messageTime';
// @ts-ignore
import { CopyIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdOutlineReport } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import { ImCancelCircle } from 'react-icons/im';
import { LuReply } from 'react-icons/lu';
import Link from 'next/link';

interface PostDetails {
  _id: string;
  originalFilename: string;
  url: string;
  extension: string;
  _createdAt: string;
}

interface MessageProps {
  _id: string;
  senderId: { userProfileImage: string; username: string; _id: string } | string;
  receiverId: { userProfileImage: string; username: string; _id: string } | string;
  message: string;
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
  replyMessage: {
    repliedMessageId: string;
    replyMessage: string;
    replyToUsername: string;
  };
  createdAt: string;
}

interface MessageComponentProps {
  message: MessageProps;
  deleteMessage: {
    deleteMessage: (_id: string, messageType: string) => void;
    loading: boolean;
  };
  messageType: 'previous' | 'current';
}

const Message = ({ message, deleteMessage, messageType }: MessageComponentProps) => {
  // @ts-ignore
  const { authUser } = useAuthContext();
  const { conversation, replyMessage, setReplyMessage } = useMessageContext()!;
  const isUserMessage =
    // @ts-ignore
    message.senderId._id === authUser?.userProfileId ||
    message.senderId === authUser?.userProfileId;
  const userMessageChatBubbleClass = `md:rounded-l-[20px] rounded-l-[30px] md:rounded-tr-[20px] rounded-tr-[30px]`;
  const messageDate = messageTime(message.createdAt);
  const detailedMessageTime = DetailedMessageTime(message.createdAt);
  const [modal, setModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<any>(null);

  // copy messages
  const copyMessage = () => {
    try {
      navigator.clipboard.writeText(message.message);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setReplyMessage({
      repliedUser: '',
      repliedUserMessage: '',
      repliedPost: {
        postId: '',
        postUrl: '',
        extension: '',
      },
    });
  }, [conversation]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      const { top, left, right, bottom } = modalRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      let newTop = top;
      let newLeft = left;
      let newRight = right;

      if (top < 100) {
        newTop = 10;
      }

      if (right > windowWidth - 50) {
        newLeft = windowWidth - right - 50;
      }

      if (left < 50) {
        newRight = 50;
      }

      if (newTop !== top) {
        modalRef.current.style.top = `${newTop}px`;
      }

      if (newLeft !== left) {
        modalRef.current.style.left = `${newLeft - 25}px`;
      }

      if (newRight !== right) {
        modalRef.current.style.right = `-${newRight + 50}px`;
      }
    }
  }, [modal]);

  const handleOpenModal = () => {
    const time = setTimeout(() => {
      setModal(true);
    }, 500);

    setTimer(time);
  };

  const handleTouchEnd = () => {
    clearTimeout(timer);
    setModal(false);
  };

  return (
    <>
      {message?.replyMessage?.replyMessage && (
        <div
          className={`h-auto flex flex-col  ${
            isUserMessage ? 'items-end  pr-10' : 'items-start pl-10'
          }`}
        >
          <div className='text-[10px] text-neutral-500'>
            replied to: {message.replyMessage.replyToUsername}
          </div>
          <div className='flex items-center mb-2 lg:max-w-[65%] max-w-[50%]'>
            <div
              className={`rounded-t-[20px] ${
                isUserMessage ? 'rounded-bl-[20px]' : 'rounded-br-[20px]'
              } w-fit flex items-center border-r-2  border-neutral-900 bg-neutral-900 px-3 py-2`}
            >
              <div className=''>
                {message.replyMessage.replyMessage.slice(0, 100)}
                {replyMessage.repliedUserMessage.length > 100 ? '...' : ''}
              </div>
            </div>
          </div>
        </div>
      )}
      {message?.post?.attachments && (
        <div
          className={`h-fit text-[13px] flex flex-col justify-center mb-2 ${
            isUserMessage ? 'items-end   pr-10' : 'items-start pl-10'
          }`}
        >
          <Link
            href={`${webUrl}/post/${message.post._id}`}
            className={` bg-neutral-900 relative  rounded-lg aspect-square
            ${message.post.aspectRatio === '16:9' && 'aspect-video'}
            ${message.post.aspectRatio === '1:1' && 'aspect-square'}
            ${message.post.aspectRatio === '4:3' && 'fourRationThree'}
            ${message.post.aspectRatio === '3:4' && 'threeRatioFour'}
          `}
          >
            <div className='flex p-2 items-center justify-between w-full gap-[11px]'>
              <div className='flex items-center gap-[11px]'>
                <Image
                  src={message.post.postedBy?.userProfileImage}
                  width={30}
                  height={30}
                  alt='user jpg'
                  className='rounded-full object-cover '
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                  unoptimized
                />
                <div className='flex font-semibold gap-3 items-center'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <Link
                        href={`/profile/${message.post.postedBy._id}`}
                        className='flex items-center gap-3'
                      >
                        {message.post.postedBy?.username}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=''>
              {message.post.attachments[0].extension === 'mp4' ? (
                <video
                  src={message.post.attachments[0].url}
                  muted={false}
                  preload='false'
                  className={`h-full w-full min-w-[250px] max-w-[250px] md:max-w-[300px] transition-all object-cover aspect-square ${
                    message.post.aspectRatio === '16:9' && 'aspect-video'
                  }
                  ${message.post.aspectRatio === '1:1' && 'aspect-square'}
                  ${message.post.aspectRatio === '4:3' && 'fourRationThree'}
                  ${message.post.aspectRatio === '3:4' && 'threeRatioFour'} `}
                ></video>
              ) : (
                <Image
                  src={message.post.attachments[0].url}
                  alt='image'
                  width={300}
                  height={0}
                  style={{ height: 'auto', width: '300' }}
                  className={`min-w-[250px] max-w-[250px] md:max-w-[300px] object-cover h-auto  
                  ${message.post.aspectRatio === '16:9' && 'aspect-video'}
                  ${message.post.aspectRatio === '1:1' && 'aspect-square'}
                  ${message.post.aspectRatio === '4:3' && 'fourRationThree'}
                  ${message.post.aspectRatio === '3:4' && 'threeRatioFour'}
                `}
                />
              )}
            </div>
            <div className='p-2'>{message.post.caption}</div>
            <span className='absolute text-[10px] top-[55px] bg-neutral-700/30 backdrop-blur-xl rounded-full px-3 font-semibold right-[10px]'>
              {message.post.attachments.length}
            </span>
          </Link>
        </div>
      )}
      <div
        className={`w-full group animate-in  duration-300 fade-in flex justify-start gap-3  ${
          isUserMessage && 'flex-row-reverse'
        } `}
      >
        {copied && (
          <div className='fixed top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <span className='animate-in fade-in-0 border py-1 px-4 rounded-full bg-neutral-900 border-neutral-800'>
              Copied
            </span>
          </div>
        )}
        <div>
          <Image
            src={
              isUserMessage
                ? authUser?.userProfileImage
                : conversation?.userProfileImage
            }
            alt='Image'
            width={30}
            height={30}
            className='aspect-square rounded-[20px] object-cover'
            unoptimized
          />
        </div>
        <div
          className='lg:max-w-[65%] max-w-[50%] w-fit select-none'
          onClick={() => {
            setReplyMessage({
              // @ts-ignore
              repliedUser: message.senderId.username,
              repliedUserMessage: message.message,
              repliedPost: {
                postId: message?.post?._id || '',
                postUrl: message?.post?.attachments[0].url || '',
                extension: message?.post?.attachments[0].extension || '',
              },
            });
          }}
        >
          {message.message && (
            <pre
              className={`h-auto text-wrap font-poppins ${
                isUserMessage
                  ? userMessageChatBubbleClass
                  : ' md:rounded-r-[20px] text-wrap rounded-r-[20px] md:rounded-tl-[20px] rounded-tl-[20px] '
              } bg-primary/50 px-5 py-2`}
            >
              <span className='text-wrap break-words'>{message.message}</span>
            </pre>
          )}
          <span
            className={`text-[11px] mt-[2px] ${
              isUserMessage ? 'text-right' : 'text-left'
            }  block text-slate-400`}
          >
            {messageDate}
          </span>
        </div>
        <div className=' relative flex items-center gap-3 mb-[20px]   transition-all'>
          <button
            className='md:group-hover:opacity-50 md:opacity-0 opacity-30  active:scale-90 '
            onClick={() => setModal(true)}
          >
            <BsThreeDots />
          </button>
          <button
            className='md:group-hover:opacity-50 md:opacity-0 md:block hidden opacity-30  active:scale-90 '
            onClick={() => {
              setReplyMessage({
                // @ts-ignore
                repliedUser: message.senderId.username,
                repliedUserMessage: message.message,
                repliedPost: {
                  postId: message?.post?._id || '',
                  postUrl: message?.post?.attachments[0].url || '',
                  extension: message?.post?.attachments[0].extension || '',
                },
              });
            }}
          >
            <LuReply />
          </button>
          {modal && (
            <div
              ref={modalRef}
              className={` absolute z-[100000] bottom-3 ${
                isUserMessage ? 'right-0' : 'left-0'
              } `}
            >
              <div
                className={`rounded-[15px] animate-in fade-in-0 items-center  w-[200px] flex gap-1 py-1 flex-col bg-[#1E1E1E]/80 shadow-lg backdrop-blur-md`}
              >
                <div className='border-b border-neutral-700/50 w-full px-[22px] text-[11px] py-2'>
                  {detailedMessageTime}
                </div>
                <p className='text-[14px] px-1 w-full rounded-[22px]'>
                  <button
                    className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-neutral-700/50 justify-between items-center'
                    onClick={() => {
                      copyMessage();
                      setModal(false);
                    }}
                  >
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                    <span>
                      <CopyIcon />
                    </span>
                  </button>
                </p>

                {isUserMessage ? (
                  <p className='text-[14px]  items-center   w-full flex justify-between px-1'>
                    <button
                      className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-red-700/50 justify-between items-center'
                      onClick={() =>
                        deleteMessage.deleteMessage(message._id, messageType)
                      }
                    >
                      <span>Delete</span>
                      {deleteMessage.loading ? (
                        <span className='dangerLoader inline-block'></span>
                      ) : (
                        <FiTrash color='red' />
                      )}
                    </button>
                  </p>
                ) : (
                  <p className='text-[14px] px-1 items-center   w-full flex justify-between'>
                    <button className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-red-700/50 justify-between items-center'>
                      <span>Report</span>
                      <MdOutlineReport fill='red' />
                    </button>
                  </p>
                )}
                <p className='text-[14px]  py-1 items-center border-t border-neutral-700/50  w-full flex justify-between px-1'>
                  <button
                    className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-neutral-700/50 justify-between items-center'
                    onClick={() => setModal(false)}
                  >
                    <span>Cancel</span>
                    <ImCancelCircle />
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
