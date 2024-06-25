import { Api } from '@/Constants';
import { useMessageContext } from '@/context/MessageContext';
import { SanityAssetDocument } from '@sanity/client';
import { useState } from 'react';

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { setMessages, conversation, replyMessage, setReplyMessage } =
    useMessageContext();

  const sendMessage = async (
    message: string,
    asset: SanityAssetDocument | undefined
  ) => {
    setLoading(true);
    console.log(asset);
    try {
      let messageBody: any = {
        message: message,
        repliedUser: replyMessage.repliedUser,
        repliedMessage: replyMessage.repliedUserMessage,
      };

      if (replyMessage.repliedPost.postId !== '') {
        messageBody.postId = replyMessage.repliedPost.postId;
      }

      if (asset) {
        messageBody.asset = {
          extension: asset[0].extension,
          url: asset[0].url,
          originalFileName: asset[0]?.originalFilename || '',
        };
      }

      console.log('Final message body:', messageBody);
      const res = await fetch(`${Api}/message/chat/send/${conversation._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageBody }),
        credentials: 'include',
      });

      const data = await res.json();
      console.log('Response from server:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, data.data]);
      setReplyMessage({
        repliedUser: '',
        repliedUserMessage: '',
        repliedPost: {
          postId: '',
          postUrl: '',
          extension: '',
        },
        repliedAsset: {
          url: '',
          extension: '',
        },
      });
    } catch (error: any) {
      console.error('Error sending message:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
