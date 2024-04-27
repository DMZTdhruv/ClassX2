'use client'

import Post from '@/components/cards/Post'
import { useEffect, useState } from 'react'
import DeletePostModal from '@/components/shared/DeleteComponent/DeletePost'
import { useInView } from 'react-intersection-observer'
import { getPosts } from './postActions'
import { usePostContext } from '@/context/PostContext'

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

interface UploadAttachments {
  _id: string
  originalFilename: string
  url: string
  extension: string
  _createdAt: string
}

interface IPost {
  _id: string
  attachments: UploadAttachments[]
  aspectRatio: string
  caption: string
  location: string
  category: string
  saved: string[]
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  likes: any[]
  comments: IComments[]
  createdAt: string
}

interface IDeletePostDetails {
  deleteId: string
  userProfileId: string
  handleModal?: (data: boolean) => void
  className?: string
}

export default function PostSection({
  postData,
  cookie,
  totalPost,
}: {
  postData: IPost[]
  cookie: string
  totalPost: number
}) {
  // ref
  const { ref, inView } = useInView()

  // states
  // const [posts, setPosts] = useState<IPost[]>(postData)
  const { feedPost, setFeedPost, totalPostDeleted } = usePostContext()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [deletePostDetails, setDeletePotDetails] = useState<IDeletePostDetails | null>(
    null
  )
  const [allPostLoaded, setAllPostLoaded] = useState<boolean>(false)
  const [page, setPage] = useState(1)

  //  handlers
  const loadMoreUpdates = async () => {
    const nextPage = page + 1
    const newPosts = await getPosts(cookie, nextPage)
    setFeedPost(prev => [...prev, ...newPosts])
    setPage(nextPage)
  }

  const handleDeleteModal = (value: boolean) => {
    setIsOpenModal(value)
  }

  const handleDeletePostDetails = ({ userProfileId, deleteId }: IDeletePostDetails) => {
    setDeletePotDetails({
      deleteId: deleteId,
      userProfileId: userProfileId,
      handleModal: handleDeleteModal,
    })
  }

  const handlePostState = (postId: string) => {
    setFeedPost(prev => (prev ? prev.filter(post => post._id !== postId) : []))
  }

  // useEffects
  useEffect(() => {
    if (inView) {
      if (feedPost.length + postData.length - totalPostDeleted >= totalPost) {
        setAllPostLoaded(true)
        return
      }
      loadMoreUpdates()
    }
  }, [inView, page])

  return (
    <div
      className={`xl:w-[60%] md:text-[15px] text-[10px] mt-[80px] w-full sm:px-[16px] sm:mt-[40px] px-[10px]  flex flex-col gap-5 items-center`}
    >
      {isOpenModal && (
        <DeletePostModal
          deleteId={deletePostDetails?.deleteId!}
          userProfileId={deletePostDetails?.userProfileId!}
          handleModal={handleDeleteModal}
          handlePostState={handlePostState}
          postData={postData}
        />
      )}
      {postData?.map((post, index) => {
        return (
          <Post
            key={post._id}
            _id={post._id}
            saved={post.saved}
            index={index}
            aspectRatio={post.aspectRatio}
            serverRenderedPost={true}
            attachments={post.attachments}
            caption={post.caption}
            location={post.location}
            category={post.category}
            postedBy={post.postedBy}
            likes={post.likes}
            comments={post.comments}
            createdAt={post.createdAt}
            handleDeletePostDetails={handleDeletePostDetails}
            handleDeleteModal={handleDeleteModal}
          />
        )
      })}
      {feedPost?.map((post, index) => {
        return (
          <Post
            key={post._id}
            _id={post._id}
            saved={post.saved}
            attachments={post.attachments}
            aspectRatio={post.aspectRatio}
            index={index}
            serverRenderedPost={false}
            caption={post.caption}
            location={post.location}
            category={post.category}
            postedBy={post.postedBy}
            likes={post.likes}
            comments={post.comments}
            createdAt={post.createdAt}
            handleDeletePostDetails={handleDeletePostDetails}
            handleDeleteModal={handleDeleteModal}
          />
        )
      })}
      <div className='w-full flex justify-center'>
        {allPostLoaded ? (
          <p className='my-5'>You are up-to-date</p>
        ) : (
          <div className='loader mb-5' ref={ref}></div>
        )}
      </div>
    </div>
  )
}
