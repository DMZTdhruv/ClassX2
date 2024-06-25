'use client';

import { useAuthContext } from '@/context/AuthContext';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useCreateUpdate from '@/hooks/classroom/useCreateUpdate';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { SanityImageAssetDocument } from '@sanity/client';
import { useGenerateLink } from '@/hooks/useGenerateLink';
import { MdCancel, MdOutlineCancel } from 'react-icons/md';
import ClassroomImageModal from '../shared/ImageModal';
import { Skeleton } from '../ui/skeleton';

interface IClassroomUpdate {
  classId: string;
  title?: string;
  description: string;
  attachments?: string[];
}

interface ErrorMessages {
  fileUploadError: string;
  incompleteDetails: string;
  uploadingImagesError: string;
  uploadError: string;
  totalImagesError: string;
}

const ClassroomUpdateCreator = ({
  adminIds,
  classId,
}: {
  adminIds: string[];
  classId: string;
}) => {
  const { authUser } = useAuthContext();
  const { loading, createUpdate, message } = useCreateUpdate();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { getUrl, generateUrl } = useGenerateLink();

  // States
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Update body
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<SanityImageAssetDocument[]>([]);
  const [generatedUrls, setGeneratedUrls] = useState<string[]>([]);

  // loading states
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [isCreatingUpdate, setIsCreatingUpdate] = useState<boolean>(false);

  // Error states
  const [error, setError] = useState<string>('');

  const [imageOpenModal, setImageOpenModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState('');

  const closeModal = () => {
    setImageOpenModal(false);
    setSelectedImage('');
  };

  const setErrorFunc = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  useEffect(() => {
    if (authUser?.userProfileId) {
      setIsAdmin(adminIds.includes(authUser.userProfileId));
    } else {
      setIsAdmin(false);
    }
  }, [authUser]);

  const adjustTextareaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [description]);

  const createUpdateForClassroom = async (e: FormEvent) => {
    e.preventDefault();
    setIsCreatingUpdate(true);
    try {
      if (description.trim() === '') {
        throw new Error('Incomplete details');
      }

      const updateData = {
        classId,
        title: title,
        description: description,
        attachments: await uploadImagesToSanity(),
      };

      await createUpdate(updateData);
      setTitle('');
      setDescription('');
      setImages([]);
    } catch (error: any) {
      setErrorFunc(error.message);
      console.error(error.message);
    } finally {
      setIsCreatingUpdate(false);
    }
  };

  const uploadImagesToSanity = async () => {
    try {
      const urls = await Promise.all(
        images.map(async image => {
          return await getUrl(image);
        })
      );
      return urls;
    } catch (error: any) {
      setErrorFunc(error.message);
      console.error(error.message);
    }
  };

  const getTemporaryImageUrl = async (e: FormEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();
      setUploadingImage(true);
      const url = await generateUrl(e);
      // @ts-ignore
      setImages(prev => [url, ...prev]);
    } catch (error: any) {
      setErrorFunc(error.message);
      console.error(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    if (imageOpenModal) {
      const body = document.getElementsByTagName('body')[0];
      body.style.overflow = 'hidden';
      return () => {
        body.style.overflow = 'auto';
      };
    }
  }, [imageOpenModal]);

  return (
    <section>
      {openModal ? (
        <form
          className='bg-neutral-900 relative flex flex-col items-end  md:p-[22px] p-[16px] rounded-[20px]'
          onSubmit={createUpdateForClassroom}
        >
          <div className='flex flex-col gap-2 w-full'>
            <label className='w-full'>
              <span className='font-semibold'>Title</span>
              <Input
                type='text'
                className='focus-visible:ring-0 bg-transparent border-none outline-none '
                placeholder='Enter the title'
                onChange={e => setTitle(e.target.value)}
                value={title}
                required
              />
            </label>
            <label className='w-full'>
              <span className='font-semibold'>Description</span>
              <textarea
                ref={textAreaRef}
                value={description}
                placeholder={'Write description...'}
                className='bg-[#171717] mt-2 w-full md:pr-[40px] pr-[30px] px-[16px] outline-none focus-visible:ring-0 resize-none border-none rounded-lg h-auto caret-violet-300'
                required
                onChange={e => setDescription(e.target.value)}
              />
            </label>
            <label
              className='flex w-fit flex-col justify-start items-start'
              htmlFor='uploadImage'
            >
              <span>Upload:</span>
              <span className=' text-white b font-semibold bg-neutral-800 cursor-pointer group px-4 mt-1 py-1 rounded-full'>
                <span className='group-active:scale-[0.95] inline-block'>
                  {' '}
                  Upload-image
                </span>
              </span>
              <input
                type='file'
                onChange={getTemporaryImageUrl}
                id='uploadImage'
                className='h-0 w-0'
              />
            </label>
            {imageOpenModal && (
              <ClassroomImageModal imageUrl={selectedImage} onClose={closeModal} />
            )}
            {images.length > 0 && (
              <Carousel className='max-w-[290px] rounded-md  mt-3 mb-10 max-h-[3000px]'>
                <CarouselContent className='max-w-[300px]  max-h-[300px] rounded-md'>
                  {images.map((image, index) => {
                    return (
                      <CarouselItem className='rounded-md relative' key={image._id}>
                        <Image
                          src={image.url}
                          alt='image'
                          width={150}
                          height={150}
                          unoptimized
                          onClick={() => {
                            setImageOpenModal(prev => !prev);
                            setSelectedImage(image.url);
                          }}
                          className='aspect-square cursor-pointer w-full h-full object-cover rounded-md'
                        />

                        <button
                          type='button'
                          className='absolute group top-3 right-3 bg-black/80 rounded-full shadow-md shadow-neutral-700 '
                          onClick={() => {
                            setImages(prev =>
                              prev.filter(img => img._id !== image._id)
                            );
                          }}
                        >
                          <MdCancel size={24} className='group-active:scale-[0.90]' />
                        </button>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <p className='mt-2 font-semibold'>Total attachments: {images.length}</p>
                <span className='mt-1 text-[13px] text-neutral-600'>
                  Drag images to move left and right
                </span>
              </Carousel>
            )}
          </div>
          <div className='flex items-center gap-3'>
            <Button
              type='submit'
              disabled={uploadingImage || isCreatingUpdate}
              className={` ${
                loading && 'animate-pulse'
              }text-white px-4 py- group rounded-full bg-primary font-bold `}
            >
              <span className='inline-block active:scale-90 text-white group-active:scale-90'>
                {isCreatingUpdate ? 'Posting...' : 'Post'}
              </span>
            </Button>
            <button
              type='button'
              onClick={() => setOpenModal(prev => !prev)}
              className={` ${
                loading && 'animate-pulse'
              }text-white px-4 py-2 rounded-full group hover:bg-neutral-800/60 bg-neutral-800 font-bold `}
            >
              <span className='inline-block group-active:scale-90'>Cancel</span>
            </button>
          </div>
          <div className='w-full text-center mt-2 text-red-500'>
            {error && <span>{error}</span>}
          </div>
          <div className='w-full text-center mt-2'>
            {uploadingImage && (
              <span className='animate-pulse text-neutral-600'>Uploading image</span>
            )}
          </div>
        </form>
      ) : (
        <div
          className='flex group cursor-pointer items-center md:p-[22px] p-[16px] bg-neutral-900 rounded-[20px]'
          onClick={() => setOpenModal(prev => !prev)}
        >
          <div className='flex items-center gap-[10px]'>
            {authUser?.userProfileImage ? (
              <Image
                src={authUser?.userProfileImage || ''}
                alt='User profile image'
                height={48}
                width={48}
                className='aspect-square object-cover rounded-full'
                unoptimized
              />
            ) : (
              <Skeleton className='h-[48px] w-[48px] rounded-full' />
            )}

            <div className='flex items-start flex-col group-hover:underline '>
              <p>Any updates click here to create!</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClassroomUpdateCreator;
