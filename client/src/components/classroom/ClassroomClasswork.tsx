import React from 'react'
import ClassroomClassworkData from './ClassroomClassworkData'
import { v4 as uuidv4 } from 'uuid'

const ClassroomClasswork = async ({
  cookie,
  topics,
  classId,
  isAdmin,
}: {
  cookie: string
  topics: string[]
  classId: string
  isAdmin: boolean
}) => {
  return (
    <>
      <div className='mt-[20px]'>
        <div className='flex flex-col gap-3'>
          {topics.map((topic, index) => {
            return (
              <div className='' key={uuidv4()}>
                <h2 className='text-2xl font-bold p-[24px] rounded-[20px] bg-neutral-800 border-neutral-800 0'>
                  {topic.toUpperCase()}
                </h2>
                <ClassroomClassworkData
                  topic={topic}
                  classId={classId}
                  cookie={cookie}
                  isAdmin={isAdmin}
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
