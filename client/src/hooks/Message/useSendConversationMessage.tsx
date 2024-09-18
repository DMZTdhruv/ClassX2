import { IConversationChats } from '@/Constants';
import { useClassXContext } from '@/context/ClassXContext';
import { useClassXSocketContext } from '@/context/ClassXSocketContext';
import { useConversationMessageContext } from '@/context/ConversationMessageContext';
import { SanityAssetDocument } from '@sanity/client';

type SocketStatus = {
  status: boolean;
  message: IConversationChats;
};

const useSendConversationMessage = () => {
  const { replyMessage } = useConversationMessageContext();
  const { socket } = useClassXSocketContext();
  const { setConversationChats, conversationChats } = useClassXContext();

  const sendMessage = async (
    senderId: string,
    receiverId: string,
    message: string,
    asset?: SanityAssetDocument
  ): Promise<boolean> => {
    try {
      let messageBody: any = {
        message,
        repliedUser: replyMessage?.repliedUser,
        replyMessage: replyMessage?.repliedUserMessage,
      };

      if (replyMessage?.repliedPost?.postId !== '') {
        messageBody.postId = replyMessage.repliedPost.postId;
      }

      if (replyMessage?.repliedAsset?.url !== '') {
        messageBody.repliedAsset = {
          extensions: replyMessage.repliedAsset.extension,
          url: replyMessage.repliedAsset.url,
        };
      }

      if (asset) {
        messageBody.asset = {
          extension: asset.extension,
          url: asset.url,
          originalFileName: asset.originalFilename || '',
        };
      }

      const resp = await sendSocketMessage(senderId, receiverId, messageBody);
      console.log(resp);
      return resp;
    } catch (error: any) {
      console.error(error.message);
      return false;
    }
  };



  const sendSocketMessage = async (
    senderId: string,
    receiverId: string,
    messageBody: any
  ): Promise<boolean> => {
    try {
      return new Promise<boolean>((resolve, reject) => {
        if (socket) {
          socket.emit('private_message_CtoS', { senderId, receiverId, messageBody });
          socket.once('private_message_StoC_response', (response: SocketStatus) => {
            const { status, message } = response;
            console.log(message);
            if (!status) reject(false);

            setConversationChats(prev => {
              return prev.map(conversation =>
                conversation._id === receiverId
                  ? {
                      ...conversation,
                      conversationChats: [...conversation.conversationChats, message],
                      totalMessagesLoaded: conversation.totalMessagesLoaded + 1,
                    }
                  : conversation
              );
            });
            resolve(true);
          });
        } else {
          reject(false);
        }
      });
    } catch (error: any) {
      return false;
    }
  };

  return { sendMessage };
};

export default useSendConversationMessage;
