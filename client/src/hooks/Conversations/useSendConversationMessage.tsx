import React, { useState } from 'react';

const useSendConversationMessage = (message: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    try {
      let messageBody: any = {
        message: message,
      };
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return <div>useSendConversationMessage</div>;
};

export default useSendConversationMessage;
