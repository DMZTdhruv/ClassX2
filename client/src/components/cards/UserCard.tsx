import Image from 'next/image'
import FollowButton from '../shared/FollowButton/FollowButton'

interface UserCardProps {
  username: string,
  userImageUrl: string,
  name: string
}

export default function UserCard({
  username,
  userImageUrl,
  name,
}: UserCardProps) {
  return (
    <div className='flex gap-[90px]'>
      <div>
        <Image
          src={userImageUrl}
          alt={name}
          height={52}
          width={52}
          style={{
            width: "52px",
            height: "52px"
          }}
          unoptimized
        />

        <div className="userInfo">
          <span>{name}</span>
          <span>{username}</span>
        </div>
      </div>
      <FollowButton />
    </div>
  )
}
