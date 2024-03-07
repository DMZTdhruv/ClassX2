import Image from 'next/image'

interface IUserDetails {
  userProfileImage: string
  username: string
  update: string
  url: string
}

export default function Conversation({ userDetails }: { userDetails: IUserDetails }) {
  const { userProfileImage, username, update, url } = userDetails
  return (
    <div className='flex cursor-pointer transition-all items-center px-[31px] h-[70px] gap-2 hover:bg-[#111111] w-full'>
      <Image
        height={44}
        width={44}
        alt='user image'
        src={userProfileImage}
        className='w-[44px] h-[44px] rounded-full object-cover aspect-square'
        unoptimized
      />
      <div className='flex flex-col'>
        <p className='font-semibold text-[17px]'>{username}</p>
        <p className=' text-[10px] text-white/50'>send 2hrs ago</p>
      </div>
    </div>
  )
}
