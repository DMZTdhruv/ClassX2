import Image from 'next/image'
import FollowButton from '../shared/FollowButton/FollowButton'

interface UserCardProps {
  currentUser: string
  _id: string
  username: string
  userImageUrl: string
  name: string
}

export default function UserCard({
  currentUser,
  _id,
  username,
  userImageUrl,
  name,
}: UserCardProps) {
  return (
    <div className='flex w-full items-center h-[68px] justify-between'>
      <div className='flex items-center'>
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

        <div className='userInfo flex flex-col h-full font-semibold justify-center gap-[1px] pl-[10px]'>
          <span className=' leading-none text-nowrap'>{name.slice(0, 10)}</span>
          <span className='text-[#474747]'>@{username}</span>
        </div>
      </div>
      <FollowButton
        _id={currentUser}
        userToFollowId={_id}
      />
    </div>
  )
}
