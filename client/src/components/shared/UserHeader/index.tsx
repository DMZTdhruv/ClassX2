import { Button } from '@/components/ui/button'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import Image from 'next/image'
import LogOut from '../LogOut/LogOut'
import FollowButton from '../FollowButton/FollowButton'

interface Token {
  userProfileId: string
}

interface UserHeaderProps {
  _id: string
  name: string
  username: string
  about: string
  userProfileImage: string
  isPrivate: boolean
  following: any[]
  followers: any[]
  post: string[]
}

export default function UserHeader({
  _id,
  name,
  username,
  about,
  userProfileImage,
  isPrivate,
  following,
  followers,
  post,
}: UserHeaderProps) {
  const cookie = cookies()
  const token = cookie.get('classX_user_token')
  const { userProfileId }: Token = token?.value
    ? jwtDecode(token?.value || '')
    : { userProfileId: '' }
  return (
    <div className='flex flex-col items-center relative mt-[40px] font-semibold  font-poppins gap-[10px]'>
      <div className='absolute top-10 right-14 sm:hidden '></div>
      <Image
        src={userProfileImage}
        alt={`${name} profile image`}
        width={124}
        height={124}
        className='rounded-full object-cover'
        style={{
          minHeight: '124px',
          minWidth: '124px',
          aspectRatio: '1 / 1',
        }}
        unoptimized
      />

      <div className='user-profile-info items-center flex flex-col'>
        <span className='text-[28px]'>{name}</span>
        <span className='text-[#474747]'>@{username}</span>
      </div>
      <p className='w-[75%] text-center text-[14px]'>{about}</p>
      <div className='user-interactions relative flex gap-[20px] mt-[8px]'>
        {_id === userProfileId && (
          <LogOut
            type='pc'
            className='top-0 bottom-0 h-[25px] left-[50%] translate-x-[-50%]'
          />
        )}
        {_id !== userProfileId && (
          <FollowButton
            _id={userProfileId}
            userToFollowId={_id}
            classes='h-[25px] px-[30px] rounded-full'
          />
        )}
      </div>
    </div>
  )
}
