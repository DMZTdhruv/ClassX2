// Textarea.tsx
'use client'
// Textarea.tsx
import { useAuthContext } from '@/context/AuthContext'
import { useMessageContext } from '@/context/MessageContext'
import { useSocketContext } from '@/context/SocketContext'
import React, {
  useEffect,
  useRef,
  ChangeEvent,
  useState,
} from 'react'


interface TextareaProps {
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
}

const CustomTextArea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { socket } = useSocketContext()
  const { conversation } = useMessageContext()
  const { authUser } = useAuthContext()
  const [isTyping, setIsTyping] = useState<boolean>(false)

  useEffect(() => {
    adjustTextareaHeight()
  }, [value])

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    adjustTextareaHeight()
    onChange(e)
  }

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onFocus={() => {
        socket?.emit('typing-message', authUser?.userProfileId, conversation._id, {
          status: true,
        })
      }}
      onBlur={() => {
        socket?.emit('typing-message', authUser?.userProfileId, conversation._id, {
          status: false,
        })
      }}
      onChange={e => {
        handleInputChange(e)
      }}
      placeholder={placeholder}
      className={className}
    />
  )
}

export default CustomTextArea
