'use client'
import { FormEvent, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useJoinClassroom from '@/hooks/classroom/useJoinClassroom'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useJoinClassroomAsAdmin from '@/hooks/classroom/useJoinClassroomAsAdmin'

const JoinClassroom = ({}) => {
  // Id states
  const [classroomAdminJoinId, setClassroomAdminJoinId] = useState<string>('')
  const [classroomJoinId, setClassroomJoinId] = useState<string>('')

  const [tabSelection, setTabSelection] = useState<string>('Classroom Id')

  // join classroom hooks
  const { loading, joinClassroom, error, message } = useJoinClassroom()
  const { joinClassroomByAdminId, adminJoiningError, adminJoiningLoading } =
    useJoinClassroomAsAdmin()

  const handleJoinClassroom = async (e: FormEvent) => {
    e.preventDefault()
    if (classroomJoinId.trim() === '') return
    await joinClassroom(classroomJoinId)
  }

  const handleJoiningAdmin = async (e: FormEvent) => {
    e.preventDefault()
    if (classroomAdminJoinId.trim() === '') return
    await joinClassroomByAdminId(classroomAdminJoinId)
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
      <div className='flex items-center justify-center'>
        <Tabs defaultValue='classroom Join Id' className='lg:w-[50vw]'>
          <TabsList className='grid w-full grid-cols-2 bg-neutral-900'>
            <TabsTrigger value='classroom Join Id'>Classroom Join Id</TabsTrigger>
            <TabsTrigger value='admin Join id'>Admin Join id</TabsTrigger>
          </TabsList>
          <TabsContent value='classroom Join Id'>
            <Card className='bg-neutral-900/80 border-none'>
              <CardHeader>
                <CardTitle>Classroom</CardTitle>
                <CardDescription>Enter classroom id to join classroom</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  <Label htmlFor='classroomJoinId'>Classroom Join Id</Label>
                  <Input
                    id='classroomJoinId'
                    placeholder='Enter your classroom join Id here'
                    value={classroomJoinId}
                    onChange={e => setClassroomJoinId(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleJoinClassroom} disabled={loading}>
                  {loading ? 'Joining classroom' : 'Join classroom'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value='admin Join id'>
            <Card className='bg-neutral-900/80 border-none'>
              <CardHeader>
                <CardTitle>Admin</CardTitle>
                <CardDescription>If you have admin join Id enter here</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  <Label htmlFor='AdminId'>Admin join Id</Label>
                  <Input
                    id='AdminId'
                    type='text'
                    placeholder='Enter your classroom admin join id'
                    value={classroomAdminJoinId}
                    onChange={e => {
                      setClassroomAdminJoinId(e.target.value)
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleJoiningAdmin} disabled={adminJoiningLoading}>
                  {adminJoiningLoading ? 'Joining classroom' : 'Join classroom'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {(adminJoiningError || error) && (
        <div className='text-center text-red-500 mt-3'>
          {adminJoiningError || error}
        </div>
      )}
    </div>
  )
}

export default JoinClassroom
