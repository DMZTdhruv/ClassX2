// Textarea.tsx

import React, { useEffect, useRef, ChangeEvent } from 'react';

interface TextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

const CustomTextArea: React.FC<TextareaProps> = ({ value, onChange, placeholder, className }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    adjustTextareaHeight();
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default CustomTextArea;
