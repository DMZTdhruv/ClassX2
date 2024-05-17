'use client';

import Conversation from './Conversation';
interface IUserDetails {
  _id: string;
  userProfileImage: string;
  username: string;
  update: string;
  url: string;
  lastActiveOn: string;
}

const Conversations = ({ sideBarUsers }: { sideBarUsers: IUserDetails[] }) => {
  return (
    <div className='sm:divide-y-0 animate-in fade-in-0 divide-y space-y-1 divide-neutral-800/80'>
      {sideBarUsers.map(user => {
        return <Conversation key={user._id} userDetails={user} />;
      })}
    </div>
  );
};

export default Conversations;
