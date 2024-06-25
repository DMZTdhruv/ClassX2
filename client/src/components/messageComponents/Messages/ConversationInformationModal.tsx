import { CopyIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { ImCancelCircle } from 'react-icons/im';
import { MdOutlineReport } from 'react-icons/md';

interface IConversationModal {
  modalRef: React.RefObject<HTMLDivElement>;
  isUserMessage: boolean;
  detailedMessageTime: string;
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConversationInformationModal = ({
  modalRef,
  isUserMessage,
  detailedMessageTime,
  setActiveModal,
}: IConversationModal) => {
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <div
      ref={modalRef}
      className={` absolute z-[100000] bottom-3 ${
        isUserMessage ? 'right-[50%]' : 'left-[50%]'
      } `}
    >
      <div
        className={`rounded-[15px] animate-in fade-in-0 items-center  w-[200px] flex gap-1 py-1 flex-col bg-[#1E1E1E]/80 shadow-lg backdrop-blur-md`}
      >
        <div className='border-b border-neutral-700/50 w-full px-[22px] text-[11px] py-2'>
          {detailedMessageTime}
        </div>
        <p className='text-[14px] px-1 w-full rounded-[22px]'>
          <button
            className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-neutral-700/50 justify-between items-center'
            onClick={() => {
              // copyMessage();
              setActiveModal(false);
            }}
          >
            <span>{copied ? 'Copied' : 'Copy'}</span>
            <span>
              <CopyIcon />
            </span>
          </button>
        </p>

        {isUserMessage ? (
          <p className='text-[14px]  items-center   w-full flex justify-between px-1'>
            <button
              className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-red-700/50 justify-between items-center'
              onClick={() => {}}
            >
              <span>Delete</span>
              {false ? (
                <span className='dangerLoader inline-block'></span>
              ) : (
                <FiTrash color='red' />
              )}
            </button>
          </p>
        ) : (
          <p className='text-[14px] px-1 items-center   w-full flex justify-between'>
            <button className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-red-700/50 justify-between items-center'>
              <span>Report</span>
              <MdOutlineReport fill='red' />
            </button>
          </p>
        )}
        <p className='text-[14px]  py-1 items-center border-t border-neutral-700/50  w-full flex justify-between px-1'>
          <button
            className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-neutral-700/50 justify-between items-center'
            onClick={() => setActiveModal(false)}
          >
            <span>Cancel</span>
            <ImCancelCircle />
          </button>
        </p>
      </div>
    </div>
  );
};

export default ConversationInformationModal;
