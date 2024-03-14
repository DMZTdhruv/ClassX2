import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'

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
    <Link
      href={`/classroom/${_id}/updates`}
      className='sm:w-[380px] hover:scale-[1.01] active:scale-[0.99]  w-full md:w-[400px] flex flex-col gap-2 border border-neutral-800 bg-neutral-900 rounded-md p-4'
    >
      <div className='border-b border-neutral-800 pb-2'>
        <div className=''>
          <h2 className='text-[33px] font-bold'>{branch}</h2>
          <span className='inline-block font-semibold'>
            {className} <br />
            Div - {division}
          </span>
        </div>
        <div>prof. {createdBy.username}</div>
      </div>
      <div className='flex justify-end items-center h-[60px] '>
        <FaArrowRight />
      </div>
    </Link>
  )
}

export default ClassroomCard
