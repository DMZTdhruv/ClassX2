import UserSuggestions from '@/components/shared/UserSuggerstion'
import SearchUser from '@/components/shared/SearchUser'

export default async function index() {
  return (
    <div className='w-[40%] flex-1 hidden xl:flex flex-col items-center pt-[35px] sticky top-0 h-[100vh] border-l-2 border-slate-800'>
      <SearchUser />
      <UserSuggestions />
    </div>
  )
}
