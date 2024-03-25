'use client'

import NormalPost from '@/components/cards/NormalPost'
import { getUserPosts } from './ProfileAction'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { IPost } from '@/Constants'

const ProfilePosts = ({
  userProfileId,
  token,
  totalPosts,
}: {
  token: string
  userProfileId: string
  totalPosts: number
}) => {
  const { ref, inView } = useInView()
  const [userPosts, setUserPosts] = useState<IPost[]>([])
  const [page, setPage] = useState<number>(1)
  const [allPostLoaded, setAllPostLoaded] = useState<boolean>(false)

  const loadMorePosts = async () => {
    const nextPage = page + 1
    const newPosts: IPost[] = await getUserPosts(userProfileId, token, page)
    setUserPosts(prev => [...prev, ...newPosts])
    setPage(nextPage)
  }

  useEffect(() => {
    if (inView) {
      if (userPosts.length >= totalPosts) {
        setAllPostLoaded(true)
        return
      }
      loadMorePosts()
    }
  }, [inView, page])

  return (
    <>
      <div className='  p-[1px]  grid grid-cols-3 max-w-[904px] gap-[1px]  '>
        {userPosts?.map(posts => {
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
