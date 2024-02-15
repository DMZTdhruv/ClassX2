import { Button } from '@/components/ui/button'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import Image from 'next/image'

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
  const { userProfileId }:Token = jwtDecode(token?.value || '')
  console.log(userProfileId, _id)
  return (
    <div className='flex flex-col items-center mt-[40px] font-semibold  font-poppins gap-[10px]'>
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
      {_id !== userProfileId && (
        <div className='user-interactions flex gap-[20px] mt-[8px]'>
          <Button className='rounded-full px-[30px] h-[25px] text-white'>
            Message
          </Button>
          <Button className='rounded-full px-[30px] h-[25px] text-white'>
            Follow
          </Button>
        </div>
      )}
    </div>
  )
}
