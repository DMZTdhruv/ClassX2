'use client'

import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useEffect,
} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { IComments, IPost, UpdateReplyCommentData } from '@/Constants'
import FollowButton from '@/components/shared/FollowButton/FollowButton'
import useCookieProvider from '@/hooks/useCookieProvider'
import { likePost, unlikePost } from '@/utils/LikeFunctions'
import ParentComment from '@/components/shared/PostComponents/CommentComponent/ParentComment'
import { formatDate } from '@/utils'

interface HeaderProps {
  username: string
  userProfileImage: string
  createdAt: string
}

function Header({ username, userProfileImage, createdAt }: HeaderProps) {
  return (
    <header className='flex flex-col h-[60px] px-[15px] space-y-2 justify-center'>
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
        <h5 className=''>{username} &nbsp;</h5>
        <span className=' text-white/50 '>{createdAt}</span>
      </div>
    </header>
  )
}

interface ImageDisplayProps {
  imageUrl: string
}

function ImageDisplay({ imageUrl }: ImageDisplayProps) {
  return (
    <Image
      src={imageUrl}
      alt=''
      width={400}
      height={300}
      style={{ width: '100%', height: 'auto' }}
      className='max-w-[400px] h-full hidden md:block object-contain'
      unoptimized
    />
  )
}

export default function PostModalPage({
  postData,
  postId,
}: {
  postData: IPost
  postId: string
}) {
  // Constants
  const api = process.env.NEXT_PUBLIC_API
  const cookie = useCookieProvider()
  const router = useRouter()
  const postedDate = formatDate(new Date(postData.createdAt))

  const inputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [allComments, setAllComments] = useState<IComments[]>(postData.comments)
  const [replyUsername, setReplyUsername] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const [replyCommentData, setReplyCommentData] = useState({
    parentCommentId: '',
    postId: '',
    repliedUserId: '',
    commentText: '',
    postedBy: '',
  })

  const handleComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleReplyUsername = (name: string) => {
    setReplyUsername(name)
    setComment(`@${name} `)
  }

  const handleReplyUserComment = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(comment.length >= replyUsername.length + 1)) {
      return
    }
    setComment(`${e.target.value}`)
    setReplyCommentData({ ...replyCommentData, commentText: e.target.value })
  }

  const updateReplyCommentData = ({
    parentCommentId,
    repliedUserId,
  }: UpdateReplyCommentData) => {
    setReplyCommentData({
      parentCommentId,
      postId: postData._id,
      repliedUserId,
      commentText: comment,
      postedBy: cookie?.userProfileId!,
    })
  }

  const focusInput = () => {
    setComment('')
    setReplyUsername('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const goBack = () => {
    router.back()
  }
  // Creating comment
  const replyComment = async () => {
    try {
      const response = await fetch(`${api}/post/comment/reply-comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie?.cookie}`,
        },
        body: JSON.stringify(replyCommentData),
      })

      if (!response.ok) {
        console.error("Couldn't not post comment")
        return
      }

      const result = await response.json()
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const submitComment = async (e: FormEvent) => {
    e.preventDefault()
    if (replyUsername) {
      replyComment()
      return
    }
    setLoading(true)
    e.preventDefault()
    try {
      const response = await fetch(`${api}/post/comment/create-comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie?.cookie}`,
        },
        body: JSON.stringify({
          postId: postId,
          commentText: comment,
          postedBy: cookie?.userProfileId,
        }),
      })

      if (!response.ok) {
        console.log('Failed to create comment')
        return
      }

      const { message } = await response.json()
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
      }

      setAllComments(prev => {
        return [userComment, ...prev]
      })
    } catch (err: any) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='w-full flexCenter h-full'>
      <div className='sm:w-auto sm:min-h-[90vh] max-w-[90%] sm:min-w-[90%] md:border  bg-[#0E0E0E]  border-slate-600 flex flex-col xl:flex-row'>
        <ImageDisplay imageUrl={postData.imageUrl} />
        <div className='top-0 sticky md:hidden block'>
          <button onClick={goBack}>hlwao</button>
        </div>
        <div className='flex flex-col flex-1 md:h-full border-l  border-slate-600 '>
          <Header
            userProfileImage={postData?.postedBy.userProfileImage!}
            username={postData?.postedBy.username!}
            createdAt={postedDate}
          ></Header>
          <div className='flex-1 border-t md:border-b border-slate-600 w-full min-h-[60vh] max-h-[45vh] overflow-y-auto '>
            <div className='flex py-[18px] px-[15px] space-y-2 justify-start'>
              <div className='flex items-start gap-3  '>
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
                <div>
                  <span className='font-semibold'>
                    {postData?.postedBy.username!}
                  </span>{' '}
                  <span>{postData.caption}</span>
                </div>
              </div>
            </div>
            {allComments?.map((comment: IComments) => {
              return (
                <ParentComment
                  postId={postData._id}
                  key={comment._id}
                  _id={comment._id}
                  parentCommentImage={comment.postedBy.userProfileImage}
                  parentCommentUserId={comment.postedBy._id}
                  parentCommentUsername={comment.postedBy.username}
                  parentCommentCommentText={comment.commentText}
                  parentCommentPostedDate={comment.createdAt}
                  parentCommentTotalLikes={comment.likes}
                  parentTotalCommentReplies={comment.commentReplies.length}
                  updateUsername={handleReplyUsername}
                  updateReplyCommentData={updateReplyCommentData}
                />
              )
            })}
          </div>
          <div className='md:flex hidden border-t md:border-t-0 border-slate-600 flex-col justify-center gap-[9px] p-[15px]'>
            <div className='flex items-center gap-[10px] '>
              <button
                onClick={() => {
                  setIsLiked(prev => !prev)
                  likePost({
                    _id: postId,
                    isLiked,
                    setNumberOfLikes,
                    numberOfLikes,
                    cookie,
                    isDevMode: true,
                    endPoint: 'post/like-post',
                  })
                  unlikePost({
                    _id: postId,
                    isLiked,
                    setNumberOfLikes,
                    numberOfLikes,
                    cookie,
                    isDevMode: true,
                    endPoint: 'post/like-post',
                  })
                }}
                className='hover:scale-105'
              >
                {isLiked ? (
                  <Image
                    src={`/bxs_heart.svg`}
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
                    src={`/heart.svg`}
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
            </div>
            <p className='text-[13px]'>{numberOfLikes} likes</p>
          </div>
          <form
            onSubmit={submitComment}
            className='flex border-t border-b md:border-b-0 border-slate-600 min-h-[80px] justify-center p-3 md:relative'
          >
            <Input
              ref={inputRef}
              type='text'
              className='bg-[#171717] md:font-semibold min-h-[78px] border-none rounded-xl'
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
  )
}
