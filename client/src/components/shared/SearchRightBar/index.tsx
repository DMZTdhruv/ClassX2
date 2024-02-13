import UserCard from '@/components/cards/UserCard'
import UserSuggestions from '@/components/shared/UserSuggerstion'
import SearchUser from '@/components/shared/SearchUser'
import { cookies } from 'next/headers'

export default async function index() {
  const cookie = cookies()
  const token = cookie.get('classX_user_token')

  return (
    <div className='w-[40%] flex-1 hidden xl:flex flex-col items-center pt-[35px] sticky top-0 h-[100vh] border-l-2 border-slate-800'>
      <SearchUser />
      <UserSuggestions />
    </div>
  )
}
