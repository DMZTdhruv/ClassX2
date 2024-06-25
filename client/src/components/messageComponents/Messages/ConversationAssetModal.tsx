import Image from 'next/image';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';

interface IAsset {
  asset: {
    extension: string;
    url: string;
  };
  setActivateAssetModal: React.Dispatch<React.SetStateAction<boolean>>;
}


//implement the video play too
const ConversationAssetModal = ({ asset, setActivateAssetModal }: IAsset) => {
  const { extension, url } = asset;
  return (
    <div className='z-[1000000000000000000] fixed top-0 left-0 bg-[#0E0E0E]/80  h-screen w-full flexCenter '>
      <div
        className={`absolute animate-in fade-in-0 z-[2000] top-0 left-0 w-full h-auto flex overflow-auto justify-center  bg-black bg-opacity-80  `}
      >
        <div className='max-w-[80vw] h-screen flex justify-center items-center sm:items-start  rounded-md shadow-lg relative'>
          <Image
            // @ts-ignore
            src={url}
            alt='Modal Image'
            height={150}
            width={150}
            unoptimized
            className={`h-auto min-w-[80vw] sm:pt-28 sm:pb-28 `}
          />
          <button
            onClick={() => setActivateAssetModal(prev => !prev)}
            className='fixed top-4 right-4 bg-transparent rounded-full p-1'
          >
            <RxCross2 size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationAssetModal;
