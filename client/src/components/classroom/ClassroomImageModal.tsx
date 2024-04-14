import Image from 'next/image'
import { useRef } from 'react'
import { MdCancel } from 'react-icons/md'

interface ImageModalProps {
  imageUrl: string
  onClose: () => void
  className?: string
}

const ClassroomImageModal: React.FC<ImageModalProps> = ({
  imageUrl,
  onClose,
  className,
}) => {
  const imageRef = useRef<HTMLElement>(null)
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, right, top, bottom } = imageRef.current.getBoundingClientRect()
      const { clientX, clientY, target } = event
      if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
        onClose()
      }
    }
  }
  return (
    <div
      className={`fixed animate-in fade-in-0 z-[100] top-0 left-0 w-full h-full flex overflow-y-auto justify-center  bg-black bg-opacity-80 ${className} `}
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
          className='h-auto min-w-[80vw] sm:pt-28 sm:pb-28'
        />
        <button
          onClick={onClose}
          className='fixed md:top-8 right-8 bg-transparent rounded-full p-1'
        >
          <MdCancel size={24} />
        </button>
      </div>
    </div>
  )
}

export default ClassroomImageModal
