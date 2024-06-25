import { IConversationChats } from '@/Constants';
import { useAuthContext } from '@/context/AuthContext';
import { DetailedMessageTime, messageTime } from '@/utils/messageTime';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import ConversationInformationModal from './ConversationInformationModal';
import Link from 'next/link';
import ConversationAssetModal from './ConversationAssetModal';
import { useConversationMessageContext } from '@/context/ConversationMessageContext';
import { LuReply } from 'react-icons/lu';

const ConversationChatBubble = ({ chatData }: { chatData: IConversationChats }) => {
  //custom hooks
  // handling reply functionality with the ConversationMessageContext hook
  const { setReplyMessage, replyMessage } = useConversationMessageContext();

  // normal const variables
  const {
    message,
    senderId,
    post,
    _id,
    createdAt,
    asset,
    replyMessage: senderReply,
  } = chatData;
  const { authUser } = useAuthContext();
  const isUserMessage = authUser?.userProfileId === senderId._id;
  const userMessageChatBubbleClass = `md:rounded-l-[20px] rounded-l-[30px] md:rounded-tr-[20px] rounded-tr-[30px]`;
  const messageDate = messageTime(createdAt);

  // modal activation
  const [activateAssetModal, setActivateAssetModal] = useState<boolean>(false);

  // refs and states of modal
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<boolean>(false);

  //asset-filtering
  const imageAssetExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  const imageAssetPresent = imageAssetExtensions.some(ext => {
    return chatData?.asset?.extension.includes(ext);
  });

  const videoAssetPresent = asset?.extension.includes('mp4');

  // fixing the position of modal
  useEffect(() => {
    if (modalRef.current) {
      const { top, left, right } = modalRef.current.getBoundingClientRect();
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

      console.log({ newRight, right });
      if (newRight !== right) {
        modalRef.current.style.right = `-${newRight + 500}px`;
      }
    }
  }, [activeModal]);

  const detailedMessageTime = DetailedMessageTime(createdAt);

  return (
    <div>
      {asset && activateAssetModal && (
        <ConversationAssetModal
          asset={asset}
          setActivateAssetModal={setActivateAssetModal}
        />
      )}
      {senderReply?.replyMessage && (
        <div
          className={`h-auto flex flex-col  ${
            isUserMessage ? 'items-end  pr-10' : 'items-start pl-10'
          }`}
        >
          <div className='text-[10px] text-neutral-500'>
            replied to: {senderReply.replyToUsername}
          </div>
          <div className='flex items-center mb-2 lg:max-w-[65%] max-w-[50%]'>
            <div
              className={`rounded-t-[20px] ${
                isUserMessage ? 'rounded-bl-[20px]' : 'rounded-br-[20px]'
              } w-fit flex items-center border-r-2  border-neutral-900 bg-neutral-900 px-3 py-2`}
            >
              <div className=''>
                {senderReply.replyMessage.slice(0, 100)}
                {replyMessage.repliedUserMessage.length > 100 ? '...' : ''}
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`h-auto flex items-center gap-[11px] w-full ${
          isUserMessage && 'flex-row-reverse'
        }`}
      >
        <div
          className={`lg:max-w-[65%] relative max-w-[50%] group flex items-end gap-[11px]  ${
            isUserMessage && 'flex-row-reverse'
          }`}
        >
          <div className='flex-shrink-0'>
            <Image
              src={
                isUserMessage ? authUser?.userProfileImage : senderId?.userProfileImage
              }
              alt='Image'
              width={30}
              height={30}
              className='aspect-square rounded-[20px] object-cover'
              unoptimized
            />
          </div>
          <div className={`flex flex-col gap-[11px] ${isUserMessage && 'items-end'}`}>
            {post?.attachments && (
              <div className='relative'>
                <Link href={`/post/${post._id}`} className='h-auto'>
                  <div
                    className={` w-[300px] md:max-w-[350px]
                              aspect-square
                              ${post.aspectRatio === '16:9' ? 'aspect-video' : ''}
                              ${post.aspectRatio === '1:1' ? 'aspect-square' : ''}
                              ${post.aspectRatio === '3:4' ? 'threeRatioFour' : ''}
                              ${post.aspectRatio === '4:3' ? 'fourRationThree' : ''}
                              bg-neutral-800/50
                              rounded-lg
                            `}
                  >
                    <div className='post-header p-2 items-center flex gap-[11px] h-[50px]'>
                      <Image
                        src={post?.postedBy?.userProfileImage}
                        height={30}
                        width={30}
                        className='h-[30px] w-[30px] object-cover rounded-full'
                        unoptimized
                        alt='user-image'
                      />
                      <p>{post?.postedBy?.username}</p>
                    </div>
                    <div className='w-full h-auto'>
                      {post?.attachments[0]?.extension === 'mp4' ? (
                        <div className='h-auto'>
                          <video
                            src={post.attachments[0].url}
                            muted
                            preload='false'
                            className={`
                          w-full
                          object-cover
                        ${post.aspectRatio === '16:9' ? 'aspect-video' : ''}
                        ${post.aspectRatio === '1:1' ? 'aspect-square' : ''}
                        ${post.aspectRatio === '3:4' ? 'threeRatioFour' : ''}
                        ${post.aspectRatio === '4:3' ? 'fourRationThree' : ''}
                        `}
                          >
                            Your browser doesn&apos;t support videos
                          </video>
                        </div>
                      ) : (
                        <div className='h-auto'>
                          <Image
                            src={post.attachments[0].url}
                            alt='image'
                            height={0}
                            width={100}
                            style={{
                              height: 'auto',
                              width: 'auto',
                            }}
                            className={`
                          w-full
                          object-cover
                        ${post.aspectRatio === '16:9' ? 'aspect-video' : ''}
                        ${post.aspectRatio === '1:1' ? 'aspect-square' : ''}
                        ${post.aspectRatio === '3:4' ? 'threeRatioFour' : ''}
                        ${post.aspectRatio === '4:3' ? 'fourRationThree' : ''}
                        `}
                            unoptimized
                          />
                        </div>
                      )}
                    </div>
                    <div className='p-2'>{post.caption}</div>
                  </div>
                </Link>
                {!message ? (
                  <button
                    className={`group-hover:opacity-100 top-[50%] translate-y-[-50%] ${
                      isUserMessage ? '-left-12' : '-right-12'
                    } mb-[10px] min-h-full absolute transition-all cursor-pointer flex-shrink-0 opacity-0 active:scale-90`}
                    onClick={() => {
                      setReplyMessage({
                        repliedUser: senderId.username,
                        repliedUserMessage: message ? message : '',
                        repliedPost: {
                          postId: post?._id || '',
                          postUrl: post?.attachments[0].url || '',
                          extension: post?.attachments[0]?.extension || '',
                        },
                        repliedAsset: {
                          url: '',
                          extension: '',
                        },
                      });
                    }}
                  >
                    <LuReply />
                  </button>
                ) : null}
                {!message ? (
                  <button
                    className={`group-hover:opacity-100 top-[50%] translate-y-[-50%] ${
                      isUserMessage ? '-left-6' : '-right-6'
                    } mb-[10px] min-h-full absolute transition-all cursor-pointer flex-shrink-0 opacity-0 active:scale-90`}
                    onClick={() => {
                      setActiveModal(prev => !prev);
                    }}
                  >
                    <BsThreeDots />
                  </button>
                ) : null}
                {activeModal && !message ? (
                  <ConversationInformationModal
                    modalRef={modalRef}
                    isUserMessage={isUserMessage}
                    detailedMessageTime={detailedMessageTime}
                    setActiveModal={setActiveModal}
                  />
                ) : null}
              </div>
            )}

            {chatData?.asset && (
              <div
                className={`flex w-full relative ${
                  isUserMessage ? 'justify-end' : 'justify-start'
                }  py-2 `}
              >
                {imageAssetPresent && (
                  <div
                    className={`
                      md:max-w-[350px] w-auto min-w-[300px]
                      aspect-square relative cursor-pointer border-2
                      border-neutral-800 rounded-lg bg-neutral-700 
                    `}
                  >
                    <Image
                      src={asset.url}
                      alt='image'
                      fill={true}
                      onClick={() => setActivateAssetModal(prev => !prev)}
                      className='absolute rounded-lg h-full w-full object-cover'
                    />
                  </div>
                )}
                {videoAssetPresent && (
                  <div className='relative h-auto w-auto'>
                    <video
                      className='md:max-w-[350px] w-auto min-w-[300px] aspect-square relative cursor-pointer border-2 border-neutral-800 rounded-lg bg-neutral-700'
                      src={asset.url}
                      muted
                      controls
                      onClick={() => setActivateAssetModal(prev => !prev)}
                    >
                      Your browser doesn&apos;t support videos
                    </video>
                  </div>
                )}
                {!message ? (
                  <button
                    className={`group-hover:opacity-100 top-[50%] translate-y-[-50%] ${
                      isUserMessage ? '-left-12' : '-right-12'
                    } mb-[10px] min-h-full absolute transition-all cursor-pointer flex-shrink-0 opacity-0 active:scale-90`}
                    onClick={() => {
                      setReplyMessage({
                        repliedUser: senderId.username,
                        repliedUserMessage: message ? message : '',
                        repliedPost: {
                          postId: post?._id || '',
                          postUrl: post?.attachments[0].url || '',
                          extension: post?.attachments[0]?.extension || '',
                        },
                        repliedAsset: {
                          url: '',
                          extension: '',
                        },
                      });
                    }}
                  >
                    <LuReply />
                  </button>
                ) : null}
                {!message ? (
                  <button
                    className={`group-hover:opacity-100 top-[50%] translate-y-[-50%] ${
                      isUserMessage ? '-left-6' : '-right-6'
                    } mb-[10px] min-h-full absolute transition-all cursor-pointer flex-shrink-0 opacity-0 active:scale-90`}
                    onClick={() => {
                      setActiveModal(prev => !prev);
                    }}
                  >
                    <BsThreeDots />
                  </button>
                ) : null}
                {activeModal && !message ? (
                  <ConversationInformationModal
                    modalRef={modalRef}
                    isUserMessage={isUserMessage}
                    detailedMessageTime={detailedMessageTime}
                    setActiveModal={setActiveModal}
                  />
                ) : null}
              </div>
            )}
            {message && (
              <div className='group  flex relative'>
                <pre
                  className={`h-auto text-wrap font-poppins ${
                    isUserMessage
                      ? userMessageChatBubbleClass
                      : ' md:rounded-r-[20px] text-wrap rounded-r-[20px] md:rounded-tl-[20px] rounded-tl-[20px] '
                  } bg-primary/50 px-5 py-2`}
                >
                  <span className='text-wrap break-words'>{message}</span>
                </pre>
                <button
                  className={`group-hover:opacity-100 top-[50%] translate-y-[-50%] ${
                    isUserMessage ? '-left-6' : '-right-6'
                  } mb-[10px] min-h-full absolute transition-all cursor-pointer flex-shrink-0 opacity-0 active:scale-90`}
                  onClick={() => {
                    setActiveModal(prev => !prev);
                  }}
                >
                  <BsThreeDots />
                </button>
                <button
                  className={`group-hover:opacity-100 top-[50%] translate-y-[-50%] ${
                    isUserMessage ? '-left-12' : '-right-12'
                  } mb-[10px] min-h-full absolute transition-all cursor-pointer flex-shrink-0 opacity-0 active:scale-90`}
                  onClick={() => {
                    setReplyMessage({
                      repliedUser: senderId.username,
                      repliedUserMessage: message ? message : '',
                      repliedPost: {
                        postId: post?._id || '',
                        postUrl: post?.attachments[0].url || '',
                        extension: post?.attachments[0]?.extension || '',
                      },
                      repliedAsset: {
                        url: '',
                        extension: '',
                      },
                    });
                  }}
                >
                  <LuReply />
                </button>
                {activeModal && (
                  <ConversationInformationModal
                    modalRef={modalRef}
                    isUserMessage={isUserMessage}
                    detailedMessageTime={detailedMessageTime}
                    setActiveModal={setActiveModal}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <span
        className={`text-[11px] mt-[2px] py-[3px] px-[45px] ${
          isUserMessage ? 'text-right' : 'text-left'
        }  block text-slate-400`}
      >
        {messageDate}
      </span>
    </div>
  );
};

export default ConversationChatBubble;
