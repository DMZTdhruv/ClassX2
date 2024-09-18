import { Api } from '@/Constants';
import ClassroomCard, { IClassroomCard } from '@/components/classroom/ClassroomCard';
import ClassroomOptions from '@/components/classroom/ClassroomOptions';
import AccessProfile from '@/components/shared/profile/AccessProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Classroom() {
  const cookie = cookies().get('classX_user_token')?.value;
  let requestError = undefined;

  const getClassrooms = async () => {
    try {
      const res = await fetch(`${Api}/classroom`, {
        method: 'GET',
        headers: {
          Cookies: `classX_user_token=${cookie}`,
        },
        cache: 'no-store',
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(`${data.error}`);
      }
      return data.data;
    } catch (error: any) {
      console.error(error.message);
      requestError = error.message;
    }
  };

  const classrooms = await getClassrooms();

  return (
    <section className='h-full w-full relative md:mt-[0px]'>
      <header className='flex w-full items-center justify-between border-b-2 border-neutral-800 gap-3 px-[16px] h-[60px]'>
        <div>
          <span
            className='inline-block text-[28px] font-black
        bg-gradient-to-r from-[#891DCC] to-[#C01DCC] bg-clip-text text-transparent
        '
          >
            ClassX-Classroom
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <ClassroomOptions />
          <AccessProfile />
        </div>
      </header>
      {classrooms?.length === 0 && (
        <div className='text-center h-[80vh] flex flex-col justify-center items-center'>
          <span className='font-black text-2xl'> Oops no classroom joined</span>
          <Link
            href={`/classroom/create-classroom`}
            className=' hover:underline text-primary font-semibold'
          >
            Create one
          </Link>
          or
          <Link
            href={`/classroom/join-classroom`}
            className=' hover:underline text-primary font-semibold'
          >
            Join classroom
          </Link>
        </div>
      )}
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
            );
          })}
        </div>
      ) : (
        <div className='sm:p-[32px] p-[16px] w-full items-center gap-3 flex flex-wrap'>
          <Skeleton className='sm:w-[380px]  active:scale-[0.99] h-[200px]  w-full md:w-[400px] rounded-md p-4' />
          <Skeleton className='sm:w-[380px]  active:scale-[0.99] h-[200px]  w-full md:w-[400px] rounded-md p-4' />
        </div>
      )}
    </section>
  );
}
