import { Button } from '@/components/ui/button'
import Image from 'next/image'

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
  return (
    <div className='flex flex-col items-center'>
      <Image
        src={userProfileImage}
        alt={`${name} profile image`}
        width={124}
        height={124}
        className='rounded-full object-cover'
        style={{
          width: '124px',
          height: '124px',
        }}
        unoptimized
      />

      <div className='user-profile-info flex flex-col'>
        <span className='text-[28px]'>{name}</span>
        <span className='bg-[#474747]'>@{username}</span>
      </div>
      <p>{about}</p>
      <div className='user-interactions flex gap-[20px]'>
        <Button className='rounded-full text-white'>Message</Button>
        <Button className='rounded-full text-white'>Follow</Button>
      </div>
    </div>
  )
}
