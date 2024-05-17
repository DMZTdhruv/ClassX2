'use client';

import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams, redirect } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
  Api,
  IComments,
  IPost,
  UpdateReplyCommentData,
  UploadAttachments,
} from '@/Constants';
import FollowButton from '@/components/shared/FollowButton/FollowButton';
import { likePost, savePost, unSavePost, unlikePost } from '@/utils/LikeFunctions';
import ParentComment from '../shared/PostComponents/ParentComment';
import { formatDate } from '@/utils';
import { HiMiniXMark } from 'react-icons/hi2';
import axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';
import DeleteCommentComponent from '../shared/DeleteComponent/DeleteComment';
import DeletePostModal from '../shared/DeleteComponent/DeletePost';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel';
import PostVideo from '../shared/Post/PostVideo';
import SuggestedUser from './SuggestedUser';
import { motion } from 'framer-motion';
import { LuSend } from 'react-icons/lu';

// Interfaces
interface GetSubComment {
  _id: string;
  parentCommentId: string;
  postId: string;
  repliedUserId: string;
  commentText: string;
  postedBy: {
    userProfileImage: string;
    username: string;
    _id: string;
  };
  likes: string[];
  createdAt: string;
}

interface ISubComment {
  _id: string;
  parentCommentId: string;
  postId: string;
  repliedUserId: string;
  commentText: string;
  postedBy: {
    userProfileImage: string;
    username: string;
    _id: string;
  };
  likes: string[];
  createdAt: string;
}
interface IUserCommentReplies {
  parentCommentId: string;
  comment: ISubComment[];
}

export default function PostModalPage({
  postData,
  postId,
}: {
  postData: IPost;
  postId: string;
}) {
  //@ts-ignore
  //auth user
  const { authUser } = useAuthContext();
  const [dummyUserComments, setDummyUserComments] = useState<IUserCommentReplies[]>([]);

  //constants
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const router = useRouter();
  const isProfile = useSearchParams().get('isProfile');
  const postedDate = formatDate(new Date(postData.createdAt));
  const [isSaved, setIsSaved] = useState<boolean>(
    postData.saved.includes(authUser?.userProfileId || '')
  );

  // refs
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // loading states
  const [isPendingComment, setIsPendingComment] = useState<boolean>(false);

  // Post data states
  const [isLiked, setIsLiked] = useState<boolean>(
    postData.likes.filter(id => id === authUser?.userProfileId).length > 0
  );
  const [numberOfLikes, setNumberOfLikes] = useState<number>(postData.likes.length);

  // Delete post states
  const [openDeletePostModal, setOpenDeletePostModal] = useState<boolean>(false);

  // comment states
  const [allComments, setAllComments] = useState<IComments[]>(postData.comments);
  const memoizedAllComments = useMemo(() => allComments, [allComments]);

  const [openDeleteCommentModal, setOpenDeleteCommentModal] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [deleteCommentDetails, setDeleteCommentDetails] =
    useState<DeleteCommentDetails | null>(null);
  const [openShareToToggle, setOpenShareToToggle] = useState<boolean>(false);

  //subcomments states
  const [replyUsername, setReplyUsername] = useState<string>('');
  const [replyCommentData, setReplyCommentData] = useState({
    parentCommentId: '',
    postId: '',
    repliedUserId: '',
    commentText: '',
    postedBy: '',
  });

  //use effects
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = 'auto';
    };
  }, []);

  // All handles

  // modal handlers
  function handleModal(value: boolean) {
    setOpenDeleteCommentModal(value);
  }

  function handleDeletePostModal(value: boolean) {
    setOpenDeletePostModal(value);
  }

  function hanldePostModalClose(event: any) {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
      if (modalRef.current) {
        const { left, right, top, bottom } = modalRef.current.getBoundingClientRect();
        const { clientX, clientY, target } = event;
        const isClickOrEnterInsideForm =
          target instanceof HTMLElement && target.closest('form');

        if (
          !isClickOrEnterInsideForm &&
          (clientX < left || clientX > right || clientY < top || clientY > bottom)
        ) {
          router.back();
        }

        if (event.type === 'keydown' && !isClickOrEnterInsideForm) {
          event.preventDefault();
        }
      }
    }
  }

  // all comment handlers
  const handleDeleteComment = (commentId: string) => {
    setAllComments(prev => {
      const comments = prev.filter(comment => comment._id !== commentId);
      return comments;
    });
  };

  const handleComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // all sub/reply comments
  const handleReplyUsername = (name: string) => {
    setReplyUsername(name);
    setComment(`@${name} `);
  };

  const likeDummyUserComment = (parentCommentId: string, subCommentId: string) => {
    setDummyUserComments(prev => {
      const index = prev.findIndex(
        comment => comment.parentCommentId === parentCommentId
      );
      if (index !== -1) {
        const updatedComments = [...prev];
        const updatedComment = { ...updatedComments[index] };
        const subCommentIndex = updatedComment.comment.findIndex(
          comment => comment._id === subCommentId
        );
        if (subCommentIndex !== -1) {
          if (
            !updatedComment.comment[subCommentIndex].likes.includes(
              authUser?.userProfileId!
            )
          ) {
            updatedComment.comment[subCommentIndex].likes.push(
              authUser?.userProfileId!
            );
          }
        }
        // Hey gpt should I add this line?
        updatedComments[index] = updatedComment;
        return updatedComments;
      } else {
        return prev;
      }
    });
  };

  const unlikeDummyUserComment = (parentCommentId: string, subCommentId: string) => {
    setDummyUserComments(prev => {
      const index = prev.findIndex(
        comment => comment.parentCommentId === parentCommentId
      );
      if (index !== -1) {
        const updatedComments = [...prev];
        const updatedComment = { ...updatedComments[index] };
        const subCommentIndex = updatedComment.comment.findIndex(
          comment => comment._id === subCommentId
        );
        if (subCommentIndex !== -1) {
          if (
            updatedComment.comment[subCommentIndex].likes.includes(
              authUser?.userProfileId!
            )
          ) {
            const subCommentLikeIndex = updatedComment.comment[
              subCommentIndex
            ].likes.indexOf(authUser?.userProfileId!);
            updatedComment.comment[subCommentIndex].likes.splice(
              subCommentLikeIndex,
              1
            );
          }
        }
        return updatedComments;
      } else {
        return prev;
      }
    });
  };

  const deleteSubComment = (parentCommentId: string, commentId: string) => {
    setDummyUserComments(prev => {
      const index = prev.findIndex(
        comment => comment.parentCommentId === parentCommentId
      );
      if (index !== -1) {
        const updatedComments = [...prev];
        const subCommentIndex = updatedComments[index].comment.findIndex(
          comment => comment._id === commentId
        );
        updatedComments[index].comment.splice(subCommentIndex, 1);
        return updatedComments;
      }
      return prev;
    });
  };

  const handleReplyUserComment = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setReplyUsername('');
      setComment('');
    }
    if (comment.length < replyUsername.length + 2) {
      if (e.target.value === `@${replyUsername} `) {
        setComment(e.target.value);
      } else {
        return;
      }
    }
    setComment(e.target.value);
    setReplyCommentData({ ...replyCommentData, commentText: e.target.value });
  };

  const updateReplyCommentData = ({
    parentCommentId,
    repliedUserId,
  }: UpdateReplyCommentData) => {
    setReplyCommentData({
      parentCommentId,
      postId: postData._id,
      repliedUserId,
      commentText: comment,
      postedBy: authUser?.userProfileId!,
    });
  };

  const updateRepliedComments = (parentCommentId: string) => {
    setDummyUserComments(prev => {
      const index = prev.findIndex(
        comment => comment.parentCommentId === parentCommentId
      );
      if (index !== -1) {
        const updatedComments = [...prev];
        updatedComments[index] = {
          ...updatedComments[index],
          comment: [], // Set the comment array to an empty array
        };
        return updatedComments;
      } else {
        return prev; // Return the previous state if parent comment is not found
      }
    });
  };

  // Normal important functions
  const focusInput = () => {
    setComment('');
    setReplyUsername('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const goBack = () => {
    router.back();
  };

  const replyComment = async () => {
    setIsPendingComment(true);

    try {
      const response = await axios.post(
        `${Api}/post/comment/reply-comment`,
        replyCommentData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const { message: result } = response.data;

      setDummyUserComments(prev => {
        const index = prev.findIndex(
          commentReply =>
            commentReply.parentCommentId === replyCommentData.parentCommentId
        );
        if (index !== -1) {
          const updatedComments = [...prev];
          updatedComments[index] = {
            ...updatedComments[index],
            comment: [...updatedComments[index].comment, result],
          };
          return updatedComments;
        } else {
          return [
            ...prev,
            { parentCommentId: replyCommentData.parentCommentId, comment: [result] },
          ];
        }
      });

      setComment('');
      setReplyUsername('');
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsPendingComment(false);
    }
  };

  const submitComment = async (e: FormEvent) => {
    e.preventDefault();
    if (replyUsername) {
      replyComment();
      return;
    }

    setIsPendingComment(true);

    try {
      const response = await axios.post(
        `${Api}/post/comment/create-comment`,
        {
          postId: postId,
          commentText: comment,
          postedBy: authUser?.userProfileId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const { message } = response.data;
      const userComment: IComments = {
        _id: message?._id,
        commentText: message?.commentText,
        postedBy: {
          username: message?.postedBy.username,
          userProfileImage: message?.postedBy.userProfileImage,
          _id: message?.postedBy._id,
        },
        createdAt: message?.createdAt,
        commentReplies: message?.commentReplies,
        likes: message?.likes,
      };

      setAllComments(prev => {
        return [userComment, ...prev];
      });
      setComment('');
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsPendingComment(false);
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section
      className='w-full animate-in fade-in-0 min-h-[100vh] responiveModal flexCenter border-neutral-800 md:border md:h-full overflow-y-auto bg-[#0E0E0E]  md:bg-transparent '
      onClick={hanldePostModalClose}
    >
      {openDeleteCommentModal && (
        <DeleteCommentComponent
          userId={deleteCommentDetails?.userId!}
          deleteId={deleteCommentDetails?.deleteId!}
          handleDeleteComment={handleDeleteComment}
          handleModal={handleModal}
          type='Comment'
        />
      )}

      {openDeletePostModal && (
        <DeletePostModal
          userProfileId={authUser?.userProfileId!}
          deleteId={postData._id}
          handleModal={handleDeletePostModal}
          userPost={true}
        />
      )}

      {openShareToToggle && (
        <div className='h-screen w-full animate-in fade-in-0 bg-[#0E0E0E]/80 fixed top-0 left-0 z-[100]'>
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.2,
              type: 'spring',
              stiffness: 800,
              damping: 50,
            }}
            style={{
              position: 'fixed',
              top: '50%',
              zIndex: '100',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SuggestedUser
              postId={postData._id}
              setOpenShareToToggle={setOpenShareToToggle}
            />
          </motion.div>
        </div>
      )}

      <button>
        <HiMiniXMark className='fixed hidden md:block top-[5%] right-[5%]' size={30} />
      </button>
      <div
        className='w-full h-full overflow-y-auto sm:h-full sm:max-w-[80%] sm:min-w-[100%] md:min-w-[80%] md:min-h-[463px] xl:min-w-[75%] xl:max-w-[80%]  md:border md:rounded-[10px] relative bg-[#0E0E0E] md:border-neutral-800 flex flex-col md:items-center md:flex-row '
        ref={modalRef}
      >
        <button
          className='top-[-1px] border-b z-50 group border-neutral-800 py-[20px] sticky md:hidden px-[16px] flex items-center bg-[#0E0E0E] '
          onClick={goBack}
        >
          <FaArrowLeftLong className=' group-active:scale-75 transition-all' />{' '}
          <p className='ml-3'>Posts</p>
        </button>
        <div className='md:hidden block'>
          <Header
            userProfileImage={postData?.postedBy.userProfileImage!}
            username={postData?.postedBy.username!}
            createdAt={postedDate}
            userId={postData?.postedBy._id}
            handleModal={handleDeletePostModal}
            router={router}
            isProfile={isProfile || 'false'}
          ></Header>
        </div>
        <ImageDisplay
          attachments={postData.attachments}
          aspectRatio={postData.aspectRatio}
          setApi={setApi}
          className=''
          current={current}
        />
        <div className='flex md:hidden border-t md:border-t-0 border-neutral-800 flex-col justify-center gap-[9px] p-[15px]'>
          <div className='flex items-center justify-between gap-[10px] '>
            <div className='flex gap-[10px] items-center'>
              <button
                onClick={() => {
                  setIsLiked(prev => !prev);
                  if (!isLiked) {
                    likePost({
                      _id: postData._id,
                      setNumberOfLikes,
                      setIsLiked,
                      numberOfLikes,
                    });
                  } else {
                    unlikePost({
                      _id: postData._id,
                      setNumberOfLikes,
                      setIsLiked,
                      numberOfLikes,
                    });
                  }
                }}
                className='hover:scale-105'
              >
                {isLiked ? (
                  <Image
                    src={`/assets/filledHeart.svg`}
                    width={25}
                    height={25}
                    alt='user jpg'
                    style={{
                      width: '25px',
                      height: '25px',
                    }}
                    className='rounded-full object-cover active:scale-90 transition-all'
                  />
                ) : (
                  <Image
                    src={`/assets/heart.svg`}
                    width={25}
                    height={25}
                    alt='user jpg'
                    style={{
                      width: '25px',
                      height: '25px',
                    }}
                    className='rounded-full object-cover active:scale-90 transition-all'
                  />
                )}
              </button>

              <button onClick={focusInput}>
                <Image
                  src={`/assets/comment.svg`}
                  width={25}
                  height={25}
                  alt='user jpg'
                  unoptimized
                  style={{
                    width: '25px',
                    height: '25px',
                  }}
                  className=' aspect-square object-cover translate-y-[-1px]'
                />
              </button>

              <LuSend
                className='h-[22px] translate-y-[-3px] w-[22px] rotate-[15deg] active:scale-90 hover:scale-[1.05] transition-all cursor-pointer '
                onClick={() => setOpenShareToToggle(prev => !prev)}
              />
            </div>

            {isSaved ? (
              <button
                onClick={() => {
                  setIsSaved(prev => !prev);
                  const data = unSavePost(postData._id, isSaved);
                  if (!data) {
                    setIsSaved(false);
                  }
                }}
              >
                <Image
                  src='/assets/bookmark-fill.svg'
                  width={30}
                  height={30}
                  priority
                  unoptimized
                  alt='bookmark icon'
                  className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 '
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsSaved(prev => !prev);
                  const data = savePost(postData._id, isSaved);
                  if (!data) {
                    setIsSaved(false);
                  }
                }}
              >
                <Image
                  src='/assets/bookmark.svg'
                  width={30}
                  height={30}
                  priority
                  unoptimized
                  alt='bookmark icon'
                  className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 fill-blue-500'
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                />
              </button>
            )}
          </div>
          <p className='text-[12px] pl-[2px]'>{numberOfLikes} likes</p>
        </div>

        <div className='flex  flex-col flex-1 md:h-full md:border-l border-neutral-800 '>
          <div className='md:block hidden'>
            <Header
              userProfileImage={postData?.postedBy.userProfileImage!}
              username={postData?.postedBy.username!}
              createdAt={postedDate}
              router={router}
              userId={postData?.postedBy._id}
              handleModal={handleDeletePostModal}
              isProfile={isProfile || 'false'}
            ></Header>
          </div>
          <div className='flex-1 md:border-t md:border-b border-neutral-800 w-full min-h-[65vh] md:max-h-[45vh] overflow-y-auto '>
            <div className='flex py-[15px] px-[15px] space-y-2 justify-start '>
              <div className='flex items-start gap-3 '>
                <Image
                  src={postData?.postedBy.userProfileImage!}
                  alt=''
                  width={30}
                  height={30}
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                  unoptimized
                  className=' aspect-square object-cover rounded-full'
                />
                <div className=' text-[12px] sm:text-[14px] mt-[3px]'>
                  <span className='font-semibold'>{postData?.postedBy.username!}</span>{' '}
                  <span>{postData?.caption}</span>
                </div>
              </div>
            </div>
            {memoizedAllComments?.map((comment: IComments) => {
              return (
                <ParentComment
                  key={comment?._id}
                  postId={postData?._id}
                  _id={comment?._id}
                  parentCommentImage={comment?.postedBy?.userProfileImage}
                  parentCommentUserId={comment?.postedBy?._id}
                  parentCommentUsername={comment?.postedBy?.username}
                  parentCommentCommentText={comment?.commentText}
                  parentCommentPostedDate={comment?.createdAt}
                  parentCommentTotalLikes={comment?.likes}
                  parentTotalCommentReplies={comment?.commentReplies?.length}
                  updateUsername={handleReplyUsername}
                  updateReplyCommentData={updateReplyCommentData}
                  userRepliedComments={dummyUserComments}
                  setDummyUserComment={setDummyUserComments}
                  updateRepliedComments={updateRepliedComments}
                  likeSubComment={likeDummyUserComment}
                  unlikeSubComment={unlikeDummyUserComment}
                  handleModal={handleModal}
                  setDeleteCommentDetails={setDeleteCommentDetails}
                  deleteSubComment={deleteSubComment}
                />
              );
            })}
          </div>
          <div className='md:flex hidden border-t md:border-t-0 border-neutral-800 flex-col justify-center gap-[9px] p-[15px]'>
            <div className='flex items-center justify-between gap-[10px] '>
              <div className='flex gap-[10px] items-center'>
                <button
                  onClick={() => {
                    setIsLiked(prev => !prev);
                    if (!isLiked) {
                      likePost({
                        _id: postData._id,
                        setNumberOfLikes,
                        setIsLiked,
                        numberOfLikes,
                      });
                    } else {
                      unlikePost({
                        _id: postData._id,
                        setNumberOfLikes,
                        setIsLiked,
                        numberOfLikes,
                      });
                    }
                  }}
                  className='hover:scale-105'
                >
                  {isLiked ? (
                    <Image
                      src={`/assets/filledHeart.svg`}
                      width={25}
                      height={25}
                      alt='user jpg'
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                      className='rounded-full object-cover active:scale-90 transition-all'
                    />
                  ) : (
                    <Image
                      src={`/assets/heart.svg`}
                      width={25}
                      height={25}
                      alt='user jpg'
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                      className='rounded-full object-cover active:scale-90 transition-all'
                    />
                  )}
                </button>

                <button onClick={focusInput}>
                  <Image
                    src={`/assets/comment.svg`}
                    width={25}
                    height={25}
                    alt='user jpg'
                    unoptimized
                    style={{
                      width: '25px',
                      height: '25px',
                    }}
                    className=' aspect-square object-cover translate-y-[-1px]'
                  />
                </button>
                <LuSend
                  className='h-[22px] translate-y-[-3px] w-[22px] rotate-[15deg] active:scale-90 hover:scale-[1.05] transition-all cursor-pointer '
                  onClick={() => setOpenShareToToggle(prev => !prev)}
                />
              </div>

              {isSaved ? (
                <button
                  onClick={() => {
                    setIsSaved(prev => !prev);
                    const data = unSavePost(postData._id, isSaved);
                    if (!data) {
                      setIsSaved(false);
                    }
                  }}
                >
                  <Image
                    src='/assets/bookmark-fill.svg'
                    width={30}
                    height={30}
                    priority
                    unoptimized
                    alt='bookmark icon'
                    className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 '
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                  />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsSaved(prev => !prev);
                    const data = savePost(postData._id, isSaved);
                    if (!data) {
                      setIsSaved(false);
                    }
                  }}
                >
                  <Image
                    src='/assets/bookmark.svg'
                    width={30}
                    height={30}
                    priority
                    unoptimized
                    alt='bookmark icon'
                    className='rounded-full sm:opacity-100 sm:hover:opacity-80 focus:scale-105 object-cover active:scale-90 fill-blue-500'
                    style={{
                      width: '30px',
                      height: '30px',
                    }}
                  />
                </button>
              )}
            </div>
            <p className='text-[12px] pl-[2px]'>{numberOfLikes} likes</p>
          </div>
          <form
            onSubmit={submitComment}
            onKeyDown={hanldePostModalClose}
            className='border-t bg-[#0E0E0E] sticky  border-b md:border-b-0 border-neutral-800 sm:min-h-[80px] justify-center p-3 bottom-[0px] md:relative'
          >
            {isPendingComment && (
              <div className='bg-[#171717] w-[80%] outline-none focus-visible:ring-0 min-h-[48px] md:font-semibold sm:min-h-[78px] border-none rounded-xl absolute top-[12px] left-[12px] gap-3 flexCenter  '>
                <span className='animate-pulse'>Uploading comment..</span>
                <div className='loader'></div>
              </div>
            )}

            <Input
              ref={inputRef}
              type='text'
              className={`bg-[#171717]  outline-none focus-visible:ring-0 min-h-[48px] md:font-semibold sm:min-h-[78px] border-none rounded-xl pr-[70px]`}
              placeholder='Type your comment'
              value={comment}
              onChange={replyUsername ? handleReplyUserComment : handleComment}
            />
            <button
              className='text-[#891DCC] bg-[#171717] absolute right-[30px] top-[50%] translate-y-[-50%] font-semibold rounded-[15px]'
              type='submit'
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

interface HeaderProps {
  username: string;
  userProfileImage: string;
  createdAt: string;
  userId: string;
  router: any;
  handleModal: (data: boolean) => void;
  isProfile?: string;
}

interface DeleteCommentDetails {
  userId: string;
  deleteId: string;
}

function Header({
  username,
  userProfileImage,
  createdAt,
  userId,
  isProfile,
  router,
  handleModal,
}: HeaderProps) {
  return (
    <header className='flex text-[12px] sm:text-[14px]  h-[60px] px-[15px] space-y-2 items-center justify-between'>
      <div className='flex font-semibold items-center gap-3  '>
        <Image
          src={userProfileImage}
          alt=''
          width={30}
          height={30}
          style={{ width: '30px', height: '30px' }}
          unoptimized
          className=' aspect-square object-cover rounded-full'
        />
        <Link href={`/profile/${userId}`}>{username}</Link>
        <span className=' text-white/50 '>{createdAt}</span>
      </div>
      {isProfile === 'true' && (
        <button
          className={`flex space-x-[2px] items-center active:scale-75 active:opacity-75 transition-all`}
          onClick={() => handleModal(true)}
        >
          <BsThreeDots size={18} />
        </button>
      )}
    </header>
  );
}

interface ImageDisplayProps {
  attachments: UploadAttachments[];
  aspectRatio: string;
  className?: string;
  unoptimized?: boolean;
  setApi: any;
  current: number;
}

function ImageDisplay({
  attachments,
  aspectRatio,
  setApi,
  current,
}: ImageDisplayProps) {
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  return (
    <Carousel className='md:w-[560px] flexCenter  rounded-md  h-auto' setApi={setApi}>
      <CarouselContent className='md:w-[560px]  rounded-md'>
        {attachments?.map(attachment => {
          return (
            <CarouselItem className='rounded-md' key={attachment._id}>
              {attachment.extension === 'mp4' ? (
                <PostVideo url={attachment.url} aspectRatio={aspectRatio} />
              ) : (
                <Image
                  src={attachment.url}
                  alt='image'
                  width={384}
                  height={0}
                  onLoad={() => {
                    setLoadingImage(true);
                  }}
                  style={{ height: 'auto', width: '560px' }}
                  unoptimized={loadingImage}
                  className={`object-cover rounded-[5px]  md:w-[560px]  border-2 border-[#171717]
                  ${!loadingImage ? 'animate-pulse rounded-md bg-neutral-700' : ''}
                  
                  ${aspectRatio === '16:9' && 'aspect-video'}
                  ${aspectRatio === '1:1' && 'aspect-square'}
                  ${aspectRatio === '4:3' && 'fourRationThree'}
                  ${aspectRatio === '3:4' && 'threeRatioFour'}
                  `}
                />
              )}
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {attachments.length > 1 && (
        <div className='py-2 absolute bottom-0 text-center mt-2 text-sm text-muted-foreground flex items-center gap-1 justify-center'>
          {attachments.map((attachment, index) => (
            <div
              key={attachment._id}
              className={`h-1 w-1 rounded-full transition-all ${
                index === current - 1 ? 'bg-primary scale-150' : 'bg-neutral-600 '
              } `}
            ></div>
          ))}
        </div>
      )}
    </Carousel>
  );
}
