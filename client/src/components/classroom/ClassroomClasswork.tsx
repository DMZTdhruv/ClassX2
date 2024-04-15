import { getClassroomClassworkData } from '@/app/(root)/classroom/classroomActions'
import React from 'react'
import ClassroomClassworkData from './ClassroomClassworkData'

const ClassroomClasswork = async ({
  cookie,
  topics,
  classId,
}: {
  cookie: string
  topics: string[]
  classId: string
}) => {
  // const classworkData = await Promise.all(
  //   topics.map(async topic => {
  //     return await getClassroomClassworkData(classId, topic)
  //   })
  // )

  return (
    <>
      <div className='mt-[20px]'>
        <div className='flex flex-col gap-3'>
          {topics.map((topic, index) => {
            return (
              <div className='' key={`${topic}_${index}`}>
                <h2 className='text-2xl font-bold p-[24px] rounded-[20px] bg-neutral-800 border-neutral-800 0'>
                  {topic.toUpperCase()}
                </h2>
                <ClassroomClassworkData
                  topic={topic}
                  classId={classId}
                  cookie={cookie}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ClassroomClasswork
