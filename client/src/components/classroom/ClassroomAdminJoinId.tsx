'use client'

import { CopyIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

const ClassroomAdminJoinId = ({
  classroomAdminJoinId,
}: {
  classroomAdminJoinId: string
}) => {
  const [copySuccess, setCopySuccess] = useState(false)
  const { toast } = useToast()
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(classroomAdminJoinId)
      setCopySuccess(true)
    } catch (error) {
      console.error('Failed to copy:', error)
      setCopySuccess(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-primary border border-neutral-800 group rounded-[20px] text-white'>
          <span className='group-active:scale-[0.98] md:text-[13px] text-[10px]'>
            {' '}
            Classroom admin Join Id
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md  rounded-[20px] bg-neutral-950 border border-neutral-800'>
        <DialogHeader>
          <DialogTitle>Classroom admin join Id</DialogTitle>
          <DialogDescription>
            New admins can be added with this classroom admin join id.
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Input
              id='link'
              defaultValue={classroomAdminJoinId}
              readOnly
              className='border-neutral-800'
            />
          </div>
          <Button
            type='button'
            className='bg-slate-800 group hover:bg-slate-700 px-3  text-white'
            size='sm'
            onClick={() => {
              copyToClipboard()
              toast({
                title: 'Copied',
                description: `${classroomAdminJoinId} is copied`,
              })
            }}
          >
            <span className='sr-only active:scale-90 transition-all'>Copy</span>
            <CopyIcon
              className='h-4 w-4  group-active:scale-90 transition-all'
              fill='white'
              color='white'
            />
          </Button>
        </div>
        <DialogFooter className='sm:justify-start'>
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

export default ClassroomAdminJoinId
