import UserSuggestions from '@/components/shared/UserSuggerstion'
import SearchUser from '../SearchUser'

export default async function index({ userProfileId }: { userProfileId: string }) {
  return (
    <div className='w-[40%] flex-1 hidden xl:flex flex-col items-center pt-[35px] sticky top-0 h-[100vh] border-l-2 border-neutral-800'>
      <div className='w-full  px-[23px]'>
        <SearchUser userId={userProfileId} />
      </div>
      <UserSuggestions />
    </div>
  )
}
