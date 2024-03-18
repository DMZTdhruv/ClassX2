'use client'
import { FormEvent, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useJoinClassroom from '@/hooks/classroom/useJoinClassroom'

const JoinClassroom = ({}) => {
  const [classroomId, setClassroomId] = useState<string>('')
  const { loading, joinClassroom, error, message } = useJoinClassroom()

  const handleJoinClassroom = async (e: FormEvent) => {
    e.preventDefault()
    console.log(classroomId)
    await joinClassroom(classroomId)
  }

  return (
    <div className='md:w-[50%] lg:w-[30%] sm:w-[50%] w-[100%]'>
      <div className='logo flex flex-col items-center'>
        <span className='inline-block text-[33px] font-black'>Join</span>
        <span
          className='inline-block text-[33px] font-black
        bg-gradient-to-r from-[#891DCC] to-[#C01DCC] bg-clip-text text-transparent
        '
        >
          Classroom
        </span>
      </div>
      <form
        className='flex items-center flex-col  gap-[12px] '
        onSubmit={handleJoinClassroom}
      >
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px] text-center pb-2'>Enter the classroom Id</p>
          <Input
            type='text'
            className='rounded-full bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Enter a classname'
            value={classroomId}
            onChange={e => setClassroomId(e.target.value)}
            required
          />
        </label>
        <Button
          className='rounded-full text-white px-[24px] py-[3px] transition-all'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Joining...' : 'Join'}
        </Button>
        {message && (
          <p className='text-center  error_message'>
            Success: <span className='text-green-500'> {message}</span>
          </p>
        )}

        {error && (
          <p className='text-center  error_message'>
            Error: <span className='text-red-500'> {error}</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default JoinClassroom
