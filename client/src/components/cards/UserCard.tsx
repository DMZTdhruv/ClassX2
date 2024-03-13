import Image from 'next/image'
import FollowButton from '../shared/FollowButton/FollowButton'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

interface UserCardProps {
  currentUser: string
  _id: string
  username: string
  userImageUrl: string
  name: string
  userId?: string
}

export default function UserCard({
  currentUser,
  _id,
  username,
  userImageUrl,
  name,
  userId,
}: UserCardProps) {
  return (
    <div className='flex w-full hover:bg-neutral-900 transition-all  items-center h-[68px] rounded-md justify-between px-[20px]'>
      <div className='flex items-center '>
        <Image
          src={userImageUrl}
          alt={name}
          height={52}
          width={52}
          className='rounded-full object-cover'
          style={{
            width: '52px',
            height: '52px',
            minWidth: '52px',
          }}
          unoptimized
        />

        <Link
          href={`/profile/${_id}`}
          className='userInfo flex flex-col h-full font-semibold justify-center gap-[1px] pl-[10px]'
        >
          <span className=' leading-none text-nowrap'>{name?.slice(0, 10)}</span>
          <span className='text-[#474747]'>@{username}</span>
        </Link>
      </div>
      {_id !== userId && <FollowButton _id={currentUser} userToFollowId={_id} />}
    </div>
  )
}
