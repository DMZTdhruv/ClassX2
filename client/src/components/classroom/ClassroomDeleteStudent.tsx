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
import useDeleteStudent from '@/hooks/classroom/useDeleteStudent'
import { DialogDescription } from '@radix-ui/react-dialog'

const ClassroomDeleteStudentModal = ({
  creatorId,
  studentId,
  classId,
}: {
  creatorId: string
  studentId: string
  classId: string
}) => {
  const { authUser } = useAuthContext()
  const { loading, error, deleteStudentById } = useDeleteStudent()

  return (
    <Dialog>
      <DialogTrigger>
        <div className='rotate-90 p-2'>
          <BsThreeDots />
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md  rounded-[20px] bg-neutral-950 border border-neutral-800'>
        <DialogHeader>
          <DialogTitle>Do you want to remove this student?</DialogTitle>
        </DialogHeader>
        <div className='flex items-center space-x-2 w-full'>
          {creatorId === authUser?.userProfileId && (
            <Button
              type='button'
              variant='default'
              className='bg-neutral-800 text-red-500 group w-full md:hover:bg-neutral-700 hover:bg-neutral-800 '
              onClick={() => {
                deleteStudentById(classId, studentId)
              }}
            >
              <span className='group-active:scale-90 transition-all text-red-500 '>
                {loading ? 'Deleting...' : 'Delete'}
              </span>
            </Button>
          )}
        </div>
        <DialogFooter className='flex items-center'>
          {error && <div className='text-red-500'>{error}</div>}
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

export default ClassroomDeleteStudentModal
