// Textarea.tsx
'use client';
// Textarea.tsx
import { useAuthContext } from '@/context/AuthContext';
import { useMessageContext } from '@/context/MessageContext';
import { useClassXSocketContext } from '@/context/ClassXSocketContext';
import React, { useEffect, useRef, ChangeEvent, useState } from 'react';

interface TextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

const CustomTextArea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { socket } = useClassXSocketContext();
  const { conversation } = useMessageContext();
  const { authUser } = useAuthContext();
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const { replyMessage, setReplyMessage, messages } = useMessageContext();

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  useEffect(() => {
    if (messages[messages.length - 1] && textareaRef.current) {
      if (messages[messages.length - 1].senderId === authUser?.userProfileId) {
        textareaRef.current.focus();
      }
    }
  }, [messages]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (replyMessage.repliedUserMessage.length > 0) {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [replyMessage]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    adjustTextareaHeight();
    onChange(e);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onFocus={() => {
        socket?.emit('typing-message', authUser?.userProfileId, conversation._id, {
          status: true,
        });
      }}
      onBlur={() => {
        socket?.emit('typing-message', authUser?.userProfileId, conversation._id, {
          status: false,
        });
      }}
      rows={1}
      onChange={e => {
        handleInputChange(e);
      }}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default CustomTextArea;
