'use client'

import NormalPost from '@/components/cards/NormalPost'
import { getUserPosts } from './ProfileAction'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { IPost } from '@/Constants'
import { usePostContext } from '@/context/PostContext'

const ProfilePosts = ({
  userProfileId,
  token,
  totalPosts,
  isDifferentUser,
}: {
  token: string
  userProfileId: string
  totalPosts: number
  isDifferentUser: boolean
}) => {
  const { ref, inView } = useInView()
  const { userPost, setUserPost } = usePostContext()
  const [differentUserPost, setDifferentUserPost] = useState<IPost[]>([])
  const [page, setPage] = useState<number>(1)
  const [allPostLoaded, setAllPostLoaded] = useState<boolean>(false)
  console.log(totalPosts)
  const loadMorePosts = async () => {
    const nextPage = page + 1
    const newPosts: IPost[] = await getUserPosts(userProfileId, token, page)
    if (isDifferentUser) {
      setDifferentUserPost(prev => [...prev, ...newPosts])
    } else {
      setUserPost(prev => [...prev, ...newPosts])
    }
    setPage(nextPage)
  }

  useEffect(() => {
    if (isDifferentUser) {
      if (inView) {
        if (differentUserPost.length >= totalPosts) {
          setAllPostLoaded(true)
          return
        }
        loadMorePosts()
      }
    } else if (!isDifferentUser) {
      if (inView) {
        if (userPost.length >= totalPosts) {
          console.log(userPost)
          setAllPostLoaded(true)
          return
        }
        loadMorePosts()
      }
    }
  }, [inView, page])

  return (
    <>
      <div className='p-[1px]  grid grid-cols-3 max-w-[904px] gap-[1px]  '>
        {isDifferentUser &&
          differentUserPost?.map(posts => {
            return (
              <NormalPost
                key={posts._id}
                _id={posts._id}
                imageUrl={posts.imageUrl}
                likes={posts.likes.length}
                comments={posts.comments.length}
              />
            )
          })}
        {!isDifferentUser &&
          userPost?.map(posts => {
            return (
              <NormalPost
                key={posts._id}
                _id={posts._id}
                imageUrl={posts.imageUrl}
                likes={posts.likes.length}
                comments={posts.comments.length}
              />
            )
          })}
      </div>
      {totalPosts === 0 ? (
        <p>No posts by this user :D</p>
      ) : (
        <div className='w-full flex justify-center'>
          {allPostLoaded ? (
            <p className='my-5'>Haha someone needs to post more 😁</p>
          ) : (
            <div className='loader my-5' ref={ref}></div>
          )}
        </div>
      )}
    </>
  )
}

export default ProfilePosts
