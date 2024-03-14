'use client'
import { FormEvent, useReducer } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useCreateClassroom from '@/hooks/classroom/useCreateClassroom'

interface ClassroomState {
  className: string
  branch: string
  division: string
  semester: string
}

const initialState: ClassroomState = {
  className: '',
  branch: '',
  division: '',
  semester: '',
}

const ACTIONS = {
  SET_CLASSNAME: 'SET_CLASSNAME',
  SET_BRANCH: 'SET_BRANCH',
  SET_DIVISION: 'SET_DIVISION',
  SET_SEMESTER: 'SET_SEMESTER',
}

type Action =
  | { type: typeof ACTIONS.SET_CLASSNAME; payload: string }
  | { type: typeof ACTIONS.SET_BRANCH; payload: string }
  | { type: typeof ACTIONS.SET_DIVISION; payload: string }
  | { type: typeof ACTIONS.SET_SEMESTER; payload: string }

const reducer = (state: ClassroomState, action: Action): ClassroomState => {
  switch (action.type) {
    case ACTIONS.SET_CLASSNAME:
      return { ...state, className: action.payload }
    case ACTIONS.SET_BRANCH:
      return { ...state, branch: action.payload }
    case ACTIONS.SET_DIVISION:
      return { ...state, division: action.payload }
    case ACTIONS.SET_SEMESTER:
      return { ...state, semester: action.payload }
    default:
      return state
  }
}

const CreateClassroom = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { loading, createClassroom, message } = useCreateClassroom()

  const handleClassName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ACTIONS.SET_CLASSNAME, payload: e.target.value })
  }
  const handleBranch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ACTIONS.SET_BRANCH, payload: e.target.value })
  }
  const handleDivision = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ACTIONS.SET_DIVISION, payload: e.target.value })
  }
  const handleSemester = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ACTIONS.SET_SEMESTER, payload: e.target.value })
  }

  const submitClassroomData = async (e: FormEvent) => {
    console.log(state)
    e.preventDefault()
    await createClassroom(state)
  }

  return (
    <div className='md:w-[50%] lg:w-[30%] sm:w-[50%] w-[100%]'>
      <div className='logo flex flex-col items-center'>
        <span className='inline-block text-[33px] font-black'>Create</span>
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
        onSubmit={submitClassroomData}
      >
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]'>Classname</p>
          <Input
            type='text'
            className='rounded-full bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Enter a classname'
            value={state.className}
            onChange={handleClassName}
            required
          />
        </label>
        <label className='w-full mb-[4px] relative '>
          <p className='mb-[2px]'>Branch</p>
          <Input
            type={'text'}
            className='rounded-full relative bg-[#171717] border-none outline-none px-[16px]'
            value={state.branch}
            placeholder='Enter a branch name'
            onChange={handleBranch}
            required
          />
        </label>
        <label className='w-full mb-[4px] relative '>
          <p className='mb-[2px]'>Division</p>
          <Input
            type='text'
            className='rounded-full relative bg-[#171717] border-none outline-none px-[16px]'
            value={state.division}
            placeholder='Enter a Division '
            onChange={handleDivision}
            required
          />
        </label>
        <label className='w-full mb-[4px] relative '>
          <p className='mb-[2px]'>Semester</p>
          <Input
            type='text'
            className='rounded-full relative bg-[#171717] border-none outline-none px-[16px]'
            value={state.semester}
            placeholder='Enter a semester name'
            onChange={handleSemester}
            required
          />
        </label>
        <Button
          className='rounded-full text-white px-[24px] py-[3px] transition-all'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in '}
        </Button>
        {message && (
          <p className='text-center  error_message'>
            Success: <span className='text-green-500'> {message}</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default CreateClassroom
