'use client'

import Conversation from './Conversation'
interface IUserDetails {
  _id: string
  userProfileImage: string
  username: string
  update: string
  url: string
}
const Conversations = ({ sideBarUsers }: { sideBarUsers: IUserDetails[] }) => {
  return (
    <div>
      {sideBarUsers.map(user => {
        return <Conversation key={user._id} userDetails={user} />
      })}
    </div>
  )
}

export default Conversations
