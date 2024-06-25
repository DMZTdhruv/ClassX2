import Image from 'next/image';
import { useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
  className?: string;
  imageClassName?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  imageClassName,
  imageUrl,
  onClose,
  className,
}) => {
  const imageRef = useRef<HTMLElement>(null);
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, right, top, bottom } = imageRef.current.getBoundingClientRect();
      const { clientX, clientY, target } = event;
      if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
        onClose();
      }
    }
  };
  return (
    <div
      className={`absolute animate-in fade-in-0 z-[2000] top-0 left-0 w-[100vw] h-auto flex overflow-auto justify-center  bg-black bg-opacity-80 ${className} `}
      onClick={handleOverlayClick}
    >
      <div className='max-w-[80vw] h-screen flex justify-center items-center sm:items-start  rounded-md shadow-lg relative'>
        <Image
          // @ts-ignore
          ref={imageRef}
          src={imageUrl}
          alt='Modal Image'
          height={150}
          width={150}
          unoptimized
          className={`h-auto min-w-[80vw] sm:pt-28 sm:pb-28 ${imageClassName}`}
        />
        <button
          onClick={onClose}
          className='fixed top-4 right-4 bg-transparent rounded-full p-1'
        >
          <RxCross2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
