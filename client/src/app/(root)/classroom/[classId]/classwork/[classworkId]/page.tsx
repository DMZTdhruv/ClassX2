import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import React from 'react';
import { getClassworkById } from '../../../classroomActions';
import { BsFiletypeDocx, BsFiletypePdf, BsFiletypePpt } from 'react-icons/bs';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { formatMessageSideBarDate } from '@/utils/formatDate';
import Image from 'next/image';
import { MdOutlineFileDownload } from 'react-icons/md';
import DownloadButton from '@/components/classroom/DownloadButton';

interface Token {
  userProfileId: string;
}

interface IClassroomWork {
  _id: string;
  classId: string;
  title: string;
  description: string;
  postedBy: {
    userProfileImage: string;
    username: string;
  };
  attachments: [
    {
      extension: string;
      url: string;
      originalFilename: string;
      _id: string;
    }
  ];
  topic: string;
  createdAt: string;
}

const Page = async ({
  params,
}: {
  params: { classId: string; classworkId: string };
}) => {
  const cookie = cookies().get('classX_user_token')?.value;
  const decodedCookie: Token | null = cookie ? jwtDecode(cookie) : null;

  const classworkData: IClassroomWork = await getClassworkById(
    cookie || '',
    params.classId,
    params.classworkId
  );

  console.log(classworkData);
  return (
    <div className='w-full p-[16px] mt-4 md:p-[30px]'>
      <div className='bg-neutral-900 rounded-xl p-6 mb-8'>
        <h1 className='text-3xl font-bold text-neutral-200'>{classworkData.title}</h1>
        <p className='text-neutral-300'>{classworkData.description}</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
        {classworkData.attachments.reverse().map((file, index) => {
          return (
            <div
              className='bg-neutral-900 rounded-xl p-4 flex flex-col justify-between'
              key={`${file._id}_${index}`}
            >
              <div className='flex items-center justify-between'>
                <span className='font-semibold text-lg text-neutral-200'>
                  {file.originalFilename}
                </span>
                <div>
                  {(file.extension === 'pptx' || file.extension === 'ppt') && (
                    <BsFiletypePpt fill='#FFAF45' size={50} />
                  )}
                  {file.extension === 'docx' && (
                    <BsFiletypeDocx fill='#5BBCFF' size={50} />
                  )}
                  {file.extension === 'pdf' && (
                    <BsFiletypePdf fill='#FF204E' size={50} />
                  )}
                </div>
              </div>
              <div className='flex items-center justify-between mt-4'>
                <Link
                  href={file.url}
                  target='_blank'
                  className='hover:underline text-neutral-300 flex items-center'
                >
                  View file <FaArrowRightLong className='ml-2' />
                </Link>
                <DownloadButton file={file} />
                <a href={`${file.url}?dl=`} download>
                  <MdOutlineFileDownload size={24} className='text-neutral-300' />
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className='gap-[10px] flex justify-between px-6 border-t-2 border-neutral-900 pt-6 mt-6'>
        <p className='text-neutral-300'>Posted by:</p>
        <div className='flex items-center mt-2'>
          <Image
            src={classworkData.postedBy.userProfileImage || ''}
            alt='User profile image'
            height={48}
            width={48}
            className='aspect-square rounded-full object-cover'
            unoptimized
          />
          <div className='flex flex-col ml-4'>
            <p className='text-neutral-200 text-lg font-semibold'>
              {classworkData.postedBy.username}
            </p>
            <p className='text-neutral-300 text-sm'>
              Posted {formatMessageSideBarDate(new Date(classworkData.createdAt))} ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
