import { SetStateAction } from 'react';

export const checkTypeOfFile = (
  file: File,
) => {
  const { type } = file;

  const imageTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg+xml',
    'image/webp',
  ];

  const fileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
  ];

  if (imageTypes.includes(type)) {
    return 'image';
  } else if (fileTypes.includes(type)) {
    return 'file';
  } else if (type === 'video/mp4') {
    return 'video';
  } else {
    throw new Error('File type is not supported');
  }
};
