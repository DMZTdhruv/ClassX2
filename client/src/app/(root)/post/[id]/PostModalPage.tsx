'use client'

import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useState, useRef } from 'react'
import FollowButton from '@/components/shared/FollowButton/FollowButton'
import Link from 'next/link'
import useCookieProvider from '@/hooks/useCookieProvider'
import { likePost, unlikePost } from '@/utils/LikeFunctions'
import ParentComment from '@/components/shared/PostComponents/CommentComponent/ParentComment'
import { useRouter } from 'next/navigation'

interface IComments {
  _id: string
  commentText: string
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  createdAt: string
  likes: string[]
  commentReplies: string[]
}

interface IPost {
  _id: string
  title: string
  imageUrl: string
  caption: string
  location: string
  category: string
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  likes: any[]
  comments: IComments[]
  createdAt: string
}

const PostModalPage = ({
  postData,
  postId,
}: {
  postData: IPost
  postId: string
}) => {

  // Constants
  const api = process.env.NEXT_PUBLIC_API
  const cookie = useCookieProvider()
  const router = useRouter()

  //refs
  const inputRef = useRef<HTMLInputElement>(null)

  // loading states
  const [loading, setLoading] = useState<boolean>(false)

  // Post states
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0)
  const [isLiked, setIsLiked] = useState<boolean>(false)

  // comment states
  const [comment, setComment] = useState<string>('')
  const [allComments, setAllComments] = useState<IComments[]>(postData.comments)

  // handling states
  const handleComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const goBack = () => {
    router.back()
  }

  // Creating comment
  const submitComment = async (e: FormEvent) => {
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
    <section className='w-full flexCenter h-full '>
      <div className='sm:w-auto sm:min-h-[85vh] max-w-[90%] sm:min-w-[80%] md:border border-slate-600 flex flex-col xl:flex-row'>
        <Image
          src={postData?.imageUrl!}
          alt=''
          width={400}
          height={300}
          style={{
            width: '100%',
            height: 'auto',
          }}
          className='xl:max-w-[400px] hidden md:block object-contain'
        />
        <div className='top-0 sticky md:hidden block'>
          <button onClick={goBack}>hlwao</button>
        </div>
        <div className='flex flex-col flex-1 md:h-auto border-l  border-slate-600'>
          <header className='flex flex-col py-[18px] px-[15px] space-y-2 justify-center'>
            <div className='flex font-semibold items-center gap-3  '>
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
              <h5 className=''>{postData?.postedBy.username!} &nbsp;</h5>
              <span className=' text-white/50 '>- 1w</span>
              {/* <FollowButton
              _id='s'
              userToFollowId='s'
              classes='h-[30px] bg-transparent ml-[20px] hover:bg-transparent text-[#891DCC] hover:text-[#891DCC]/50 transition-all font-bold w-[60px]'
            /> */}
            </div>
          </header>
          <div className='flex-1 border-t md:border-b border-slate-600 h-full w-full overflow-y-auto md:max-h-[425px] '>
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
                  key={comment._id}
                  _id={comment._id}
                  parentCommentImage={comment.postedBy.userProfileImage}
                  parentCommentUsername={comment.postedBy.username}
                  parentCommentCommentText={comment.commentText}
                  parentCommentPostedDate={comment.createdAt}
                  parentCommentTotalLikes={comment.likes}
                  parentTotalCommentReplies={comment.commentReplies.length}
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
            className='flex border-t border-b md:border-b-0 border-slate-600 h-[80px] justify-center p-3 md:relative'
          >
            <Input
              ref={inputRef}
              type='text'
              className='bg-[#171717] md:font-semibold h-full border-none rounded-xl'
              placeholder='Type your comment'
              value={loading ? 'Sending comment' : comment}
              onChange={handleComment}
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

export default PostModalPage
