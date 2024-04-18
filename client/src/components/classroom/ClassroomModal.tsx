'use client'

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { BsThreeDots } from 'react-icons/bs'
import { useAuthContext } from '@/context/AuthContext'
import useDeleteClassroom from '@/hooks/classroom/useDeleteClassroom'
import useUnEnrolClassroom from '@/hooks/classroom/useUnenrolClassroom'

const ClassroomModal = ({
  creatorId,
  classId,
}: {
  creatorId: string
  classId: string
}) => {
  const { toast } = useToast()
  const { authUser } = useAuthContext()
  const { loading, deleteClassroom, error } = useDeleteClassroom()
  const {
    unEnrolStudent,
    error: unEnrolError,
    loading: unEnrolLoading,
  } = useUnEnrolClassroom()
  return (
    <Dialog>
      <DialogTrigger>
        <div className='rotate-90 p-2'>
          <BsThreeDots />
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md  rounded-[20px] bg-neutral-950 border border-neutral-800'>
        <DialogHeader>
          <DialogTitle>
            Do you want to{' '}
            {creatorId !== authUser?.userProfileId ? 'un-enrol' : 'delete classroom'}
          </DialogTitle>
        </DialogHeader>
        <div className='flex items-center space-x-2 w-full'>
          {creatorId !== authUser?.userProfileId && (
            <Button
              type='button'
              variant='default'
              className='bg-neutral-800 group w-full hover:bg-neutral-700 text-white'
              onClick={() => {
                unEnrolStudent(classId)
              }}
              disabled={unEnrolLoading}
            >
              <span className='group-active:scale-90 transition-all'>
                {unEnrolLoading ? 'un-enrolling...' : 'un-enrol'}
              </span>
            </Button>
          )}
          {creatorId === authUser?.userProfileId && (
            <Button
              type='button'
              variant='default'
              className='bg-neutral-800 text-red-500 group w-full md:hover:bg-neutral-700 hover:bg-neutral-800 '
              onClick={() => {
                deleteClassroom(classId)
              }}
            >
              <span className='group-active:scale-90 transition-all text-red-500 '>
                {loading ? 'Deleting...' : 'Delete'}
              </span>
            </Button>
          )}
        </div>
        <DialogFooter className='flex items-center'>
          {(error || unEnrolError) && (
            <div className='text-red-500'>{error || unEnrolError}</div>
          )}
          <DialogClose asChild>
            <Button
              type='button'
              variant='default'
              className='bg-neutral-800 group hover:bg-neutral-700 text-white'
            >
              <span className='  group-active:scale-90 transition-all'>Close</span>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ClassroomModal
