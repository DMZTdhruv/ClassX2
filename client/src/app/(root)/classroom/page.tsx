import { Api } from '@/Constants'
import ClassroomCard, { IClassroomCard } from '@/components/classroom/ClassroomCard'
import ClassroomOptions from '@/components/classroom/ClassroomOptions'
import { cookies } from 'next/headers'

export default async function Classroom() {
  const cookie = cookies().get('classX_user_token')?.value
  let requestError = undefined
  
  const getClassrooms = async () => {
    try {
      const res = await fetch(`${Api}/classroom`, {
        method: 'GET',
        headers: {
          Cookies: `classX_user_token=${cookie}`,
        },
        cache: 'no-store',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(`${data.error}`)
      }
      console.log(data.data)
      return data.data
    } catch (error: any) {
      console.error(error.message)
      requestError = error.message
    }
  }

  const classrooms = await getClassrooms()

  return (
    <section className='h-full w-full relative md:mt-[0px]'>
      <header className='flex w-full items-center justify-between border-b-2 border-neutral-800 gap-3 px-[16px] h-[60px]'>
        <div>
          <span
            className='inline-block text-[28px] font-black
        bg-gradient-to-r from-[#891DCC] to-[#C01DCC] bg-clip-text text-transparent
        '
          >
            ClassX
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <ClassroomOptions />
          <div className='icon h-4 w-4 rounded-full bg-red-300'></div>
        </div>
      </header>
      {classrooms && !requestError ? (
        <div className='sm:p-[32px] p-[16px] w-full items-center gap-3 flex flex-wrap'>
          {classrooms.map((classroom: IClassroomCard) => {
            return (
              <ClassroomCard
                key={classroom._id}
                _id={classroom._id}
                className={classroom.className}
                branch={classroom.branch}
                division={classroom.division}
                semester={classroom.semester}
                createdBy={classroom.createdBy}
              />
            )
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  )
}
