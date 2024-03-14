'use client'

import Post from '@/components/cards/Post'
import { useEffect, useState } from 'react'
import DeletePostModal from '@/components/shared/DeleteComponent/DeletePost'
import { useInView } from 'react-intersection-observer'
import { getPosts } from './postActions'

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
  const [posts, setPosts] = useState<IPost[]>(postData)
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
    setPosts(prev => [...prev, ...newPosts])
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
    setPosts(prev => (prev ? prev.filter(post => post._id !== postId) : []))
  }

  // useEffects
  useEffect(() => {
    if (inView) {
      if (posts.length >= totalPost) {
        setAllPostLoaded(true)
        return
      }
      loadMoreUpdates()
    }
  }, [inView, page])

  return (
    <div
      className={`xl:w-[60%] mt-[80px] w-full sm:px-[16px] sm:mt-[40px]  px-[16px] flex flex-col gap-5 items-center`}
    >
      {isOpenModal && (
        <DeletePostModal
          deleteId={deletePostDetails?.deleteId!}
          userProfileId={deletePostDetails?.userProfileId!}
          handleModal={handleDeleteModal}
          handlePostState={handlePostState}
        />
      )}
      {posts?.map(post => {
        return (
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            imageUrl={post.imageUrl}
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
