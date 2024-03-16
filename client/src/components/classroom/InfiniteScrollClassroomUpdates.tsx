'use client'
import { getClassroomUpdates } from '@/app/(root)/classroom/classroomActions'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ClassroomUpdate from './ClassroomUpdate'

interface IClassroomUpdate {
  _id: string
  classId: string
  description: string
  attachments?: string[]
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  createdAt: string
}

const InfiniteScrollClassroomUpdates = ({
  cookie,
  classId,
  totalUpdates,
}: {
  cookie: string
  classId: string
  totalUpdates: number
}) => {
  const [update, setUpdate] = useState<IClassroomUpdate[]>([])
  const [allUpdateReceived, setAllUpdateReceived] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const { ref, inView } = useInView()
  const loadMoreUpdates = async () => {
    const nextPage = page + 1
    const classroomUpdates: IClassroomUpdate[] = await getClassroomUpdates(
      cookie || '',
      classId,
      nextPage
    )
    setPage(nextPage)
    setUpdate(prev => [...prev, ...classroomUpdates])
  }

  useEffect(() => {
    if (inView) {
      if (update.length + 10 >= totalUpdates) {
        setAllUpdateReceived(true)
        return
      }
      loadMoreUpdates()
    }
  }, [inView, page])

  return (
    <>
      {update?.map(update => {
        return (
          <ClassroomUpdate
            key={update._id}
            classroomUpdate={{
              postedBy: {
                username: update.postedBy.username,
                userProfileImage: update.postedBy.userProfileImage,
              },
              createdAt: update.createdAt,
              description: update.description,
            }}
          />
        )
      })}
      <div className='w-full flex justify-center'>
        {allUpdateReceived ? (
          <p>You are up-to-date</p>
        ) : (
          <div className='loader' ref={ref}></div>
        )}
      </div>
    </>
  )
}

export default InfiniteScrollClassroomUpdates
