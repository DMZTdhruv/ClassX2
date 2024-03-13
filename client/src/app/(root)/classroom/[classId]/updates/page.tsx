import ClassroomCalendar from '@/components/classroom/ClassroomCalendar'
import ClassroomPost from '@/components/classroom/ClassroomPost'
import ClassroomUpdateHeaderCard from '@/components/classroom/ClassroomUpdateHeaderCard'
import React from 'react'

const Updates = ({ params }: { params: { classId: string } }) => {
  return (
    <section className='md:p-[22px] p-[16px]'>
      <ClassroomUpdateHeaderCard
        className={'Computer-Science-Engineering'}
        division='H'
      />
      <div className='flex gap-[22px] mt-[22px]'>
        <ClassroomCalendar />
        <div className='flex flex-col gap-[22px]'>
          <ClassroomPost
            classroomPost={{
              postedBy: {
                username: 'yaeDhruv',
                userProfileImage: '',
              },
              createdAt: '10th march 2022',
              title: 'hello',
              description:
                'Our match will be in next 2 days so get ready to score the best in the match. Let’s decide a meeting in google meet haha. Gotta destory those stupid dumb people with my kaiser impact hehe. Anyways dhruv counting on ya! you are pretty much the real egoist of our team haha',
            }}
          />
          <ClassroomPost
            classroomPost={{
              postedBy: {
                username: 'yaeDhruv',
                userProfileImage: '',
              },
              createdAt: '10th march 2022',
              title: 'hello',
              description:
                'Our match will be in next 2 days so get ready to score the best in the match. Let’s decide a meeting in google meet haha. Gotta destory those stupid dumb people with my kaiser impact hehe. Anyways dhruv counting on ya! you are pretty much the real egoist of our team haha',
            }}
          />
          <ClassroomPost
            classroomPost={{
              postedBy: {
                username: 'yaeDhruv',
                userProfileImage: '',
              },
              createdAt: '10th march 2022',
              title: 'hello',
              description:
                'Our match will be in next 2 days so get ready to score the best in the match. Let’s decide a meeting in google meet haha. Gotta destory those stupid dumb people with my kaiser impact hehe. Anyways dhruv counting on ya! you are pretty much the real egoist of our team haha',
            }}
          />
          <ClassroomPost
            classroomPost={{
              postedBy: {
                username: 'yaeDhruv',
                userProfileImage: '',
              },
              createdAt: '10th march 2022',
              title: 'hello',
              description:
                'Our match will be in next 2 days so get ready to score the best in the match. Let’s decide a meeting in google meet haha. Gotta destory those stupid dumb people with my kaiser impact hehe. Anyways dhruv counting on ya! you are pretty much the real egoist of our team haha',
            }}
          />
          <ClassroomPost
            classroomPost={{
              postedBy: {
                username: 'yaeDhruv',
                userProfileImage: '',
              },
              createdAt: '10th march 2022',
              title: 'hello',
              description:
                'Our match will be in next 2 days so get ready to score the best in the match. Let’s decide a meeting in google meet haha. Gotta destory those stupid dumb people with my kaiser impact hehe. Anyways dhruv counting on ya! you are pretty much the real egoist of our team haha',
            }}
          />
          <ClassroomPost
            classroomPost={{
              postedBy: {
                username: 'yaeDhruv',
                userProfileImage: '',
              },
              createdAt: '10th march 2022',
              title: 'hello',
              description:
                'Our match will be in next 2 days so get ready to score the best in the match. Let’s decide a meeting in google meet haha. Gotta destory those stupid dumb people with my kaiser impact hehe. Anyways dhruv counting on ya! you are pretty much the real egoist of our team haha',
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Updates
