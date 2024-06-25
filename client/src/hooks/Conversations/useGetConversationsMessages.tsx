import { Api, IConversationChats } from '@/Constants';

const useGetConversationsMessages = () => {
  const getTotalCurrentConversationMessages = async (
    receiverId: string
  ): Promise<number> => {
    try {
      console.log('Making a fetch request');
      const res = await fetch(
        `${Api}/message/chat/total-conversation-chat/${receiverId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }

      return data.data as number;
    } catch (error: any) {
      console.error(`Failed to get the messages: `, error.message);
      return 0; // default value in case of error
    }
  };

  const getMessages = async (
    page: number,
    receiverId: string
  ): Promise<IConversationChats[]> => {
    try {
      const res = await fetch(
        `${Api}/message/chat/${receiverId}?page=${page}&limit=20`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data.data as IConversationChats[];
    } catch (error: any) {
      console.error(error.message);
      return []; // default value in case of error
    }
  };

  return { getMessages, getTotalCurrentConversationMessages };
};

export default useGetConversationsMessages;
