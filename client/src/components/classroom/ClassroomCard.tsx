import Link from 'next/link'
import { BsThreads, BsThreeDots } from 'react-icons/bs'
import { FaArrowRight } from 'react-icons/fa6'
import ClassroomModal from './ClassroomModal'

export interface IClassroomCard {
  _id?: string
  branch: string
  className: string
  division: string
  semester: string
  createdBy: {
    _id: string
    username: string
  }
}

const ClassroomCard = ({
  _id,
  branch,
  className,
  division,
  semester,
  createdBy,
}: IClassroomCard) => {
  return (
    <div className='sm:w-[380px] relative z-[10] hover:scale-[1.01] active:scale-[0.99]  w-full md:w-[350px] flex flex-col gap-2 border border-neutral-800 bg-neutral-900 rounded-md p-4 '>
      <Link
        href={`/classroom/${_id}/updates`}
        className='border-b border-neutral-800 pb-2'
      >
        <div className=''>
          <h2 className='text-[28px] font-bold'>{branch}</h2>
          <span className='inline-block font-semibold'>
            {className} <br />
            Div - {division}
          </span>
        </div>
        <div>prof. {createdBy.username}</div>
      </Link>
      <Link
        href={`/classroom/${_id}/updates`}
        className='flex justify-end items-center h-[60px] '
      >
        <FaArrowRight />
      </Link>
      <div className='absolute top-4 right-4 active:scale-95 '>
        {/* @ts-ignore */}
        <ClassroomModal creatorId={createdBy._id} classId={_id} />
      </div>
    </div>
  )
}

export default ClassroomCard
