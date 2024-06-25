'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useGenerateFileLink from '@/hooks/useGenerateFileLink';
import { useGenerateLink } from '@/hooks/useGenerateLink';
import { SanityAssetDocument, SanityImageAssetDocument } from '@sanity/client';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';
import Image from 'next/image';
import useUploadPost from '@/hooks/posts/useUploadPost';
import { updateFeed } from '../serverActions';
import { useClassXContext } from '@/context/ClassXContext';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import PostVideo from '@/components/shared/Post/PostVideo';

interface UploadAttachments {
  _id: string;
  originalFilename: string;
  url: string;
  extension: string;
  _createdAt: string;
}

interface IAttachment {
  attachments: UploadAttachments[];
  aspectRatio: string;
  caption: string;
  location: string;
  category: string;
}

const UploadPost = () => {
  //carousel
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Loading states
  const [loading, setLoading] = useState<boolean>(false);
  const [postUploading, setPostUploading] = useState<boolean>(false);

  // Error states
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  //constants and contexts
  const { getFile, generateTempVideoUrl } = useGenerateFileLink();
  const { getUrlImageObj, generateUrl } = useGenerateLink();
  const { uploadPost } = useUploadPost();
  const { setFeedPost, setExplorePost, setUserPost } = useClassXContext();
  const router = useRouter();

  // attachment states
  const [temporaryAttachments, setTemporaryAttachments] = useState<
    SanityImageAssetDocument[] | SanityAssetDocument[]
  >([]);

  // Post states
  const aspectRatios = ['16:9', '1:1', '4:3', '3:4'];
  const [aspectRatio, setAspectRatio] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  // loading states
  const [dummyLoading, setDummyLoading] = useState<boolean>(false);

  // UseEffects
  useEffect(() => {
    setCount(temporaryAttachments.length);
  }, [temporaryAttachments]);

  // Functions
  const getTemporaryUrl = async (e: FormEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const inputElement = e.target as HTMLInputElement;
      if (inputElement.files) {
        const { type } = inputElement.files[0];
        if (
          type === 'image/jpeg' ||
          type === 'image/png' ||
          type === 'image/gif' ||
          type === 'image/svg+xml' ||
          type === 'image/webp'
        ) {
          const tempFile = await generateUrl(e);
          tempFile && setTemporaryAttachments(prev => [tempFile, ...prev]);
        } else if (type === 'video/mp4') {
          const tempFile = await generateTempVideoUrl(e);
          tempFile && setTemporaryAttachments(prev => [tempFile, ...prev]);
        } else {
          throw new Error('Invalid format');
        }
      }
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const generateUrls = async () => {
    const mp4Files = temporaryAttachments.filter(file => file.extension === 'mp4');
    const pictureFiles = temporaryAttachments.filter(file => file.extension !== 'mp4');

    const mp4Promises = mp4Files.map(async file => await getFile(file));
    const picturePromises = pictureFiles.map(async file => await getUrlImageObj(file));

    const [mp4Urls, pictureUrls] = await Promise.all([
      Promise.all(mp4Promises),
      Promise.all(picturePromises),
    ]);

    const allUrls: UploadAttachments[] = [...mp4Urls.flat(), ...pictureUrls.flat()];
    return allUrls;
  };

  const uploadPostToDb = async (e: FormEvent) => {
    e.preventDefault();
    setPostUploading(true);
    try {
      validateInput();
      const allAttachmentUrls = await generateUrls();
      const uploadPostBody: IAttachment = {
        attachments: allAttachmentUrls,
        aspectRatio: aspectRatio,
        caption: caption,
        location: location,
        category: category,
      };


      await uploadPost(uploadPostBody);
      updateFeed();
      setExplorePost([]);
      setFeedPost([]);
      setUserPost([]);
      router.replace('/');
    } catch (error: any) {
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 5000);
      console.error(error.message);
    } finally {
      setPostUploading(false);
    }
  };

  const validateInput = () => {
    if (
      caption.trim() === '' ||
      category.trim() === '' ||
      location.trim() === '' ||
      temporaryAttachments.length === 0
    ) {
      throw new Error('Incomplete details');
    }
  };

  const attachmentElements = useMemo(() => {
    return temporaryAttachments.map((file, index) => {
      return (
        <div className='relative w-full h-full flex-shrink-0' key={uuidv4()}>
          <CarouselItem className='rounded-md '>
            {file.extension === 'mp4' ? (
              <PostVideo aspectRatio={aspectRatio} url={file.url} />
            ) : (
              <div>
                <Image
                  src={file.url}
                  alt='image'
                  width={150}
                  height={150}
                  unoptimized
                  className={` 
                transition-all
                aspect-square
                cursor-pointer w-full h-full object-cover rounded-md
                ${aspectRatio === '16:9' && 'aspect-video'}
                ${aspectRatio === '1:1' && 'aspect-square'}
                ${aspectRatio === '4:3' && 'fourRationThree'}
                ${aspectRatio === '3:4' && 'threeRatioFour'}
              `}
                />
              </div>
            )}
          </CarouselItem>
          <button
            type='button'
            className='absolute   cursor-pointer group z-50 top-3 right-3 rounded-full shadow-md  '
            onClick={() => {
              setTemporaryAttachments(prev => {
                return prev.filter(attachment => attachment._id !== file._id);
              });
            }}
          >
            <MdDeleteOutline size={24} className='group-active:scale-[0.90]' />
          </button>
        </div>
      );
    });
  }, [temporaryAttachments, aspectRatio]);

  return (
    <div className='flex-col w-full  flex lg:justify-center pb-[100px] sm:px-[16px] lg:h-screen p-[16px] mt-[80px] sm:mt-[0px]'>
      <div className='flex flex-col items-center gap-3'>
        <header className='sm:text-[33px] mt-[36px] font-black sm:block hidden'>
          <h2 className='sm:block hidden pb-[30px]'>
            Upload
            <span className='inline-block  font-black bg-gradient-to-r from-[#891DCC] to-[#C01DCC] bg-clip-text text-transparent'>
              &nbsp;Post
            </span>
          </h2>
          <p className='sm:hidden'>Upload post</p>
        </header>
        <div className='w-full flex lg:flex-row flex-col gap-5 lg:justify-center items-center h-full '>
          <div
            className={`w-full max-w-[548px] min-h-[300px] rounded-xl p-5 bg-[#171717]`}
          >
            {temporaryAttachments.length > 0 ? (
              <div className='w-full  min-h-[300px]'>
                <Carousel
                  className={`w-full ${
                    loading ? 'animate-pulse' : null
                  } min-h-[300px] relative`}
                  setApi={setApi}
                >
                  <CarouselContent>{attachmentElements}</CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className='py-2 text-center mt-2 text-sm text-muted-foreground flex items-center gap-1 justify-center'>
                  {Array.from({ length: count }).map((_, index) => (
                    <div
                      key={uuidv4()}
                      className={`h-1 w-1 rounded-full transition-all ${
                        index === current - 1
                          ? 'bg-primary scale-150'
                          : 'bg-neutral-600 '
                      } `}
                    ></div>
                  ))}
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <label className='bg-neutral-900 rounded-md p-1  opacity-70 hover:opacity-100 transition-opacity right-0 bottom-0'>
                      <MdAdd size={25} />
                      <input
                        accept='image/*, video/mp4'
                        type='file'
                        disabled={loading}
                        className='h-0 w-0 hidden'
                        onChange={e => {
                          getTemporaryUrl(e);
                        }}
                      />
                    </label>
                  </div>
                  <div className='flex items-center gap-2'>
                    {aspectRatios.map(aspectRationValue => {
                      return (
                        <Button
                          key={uuidv4()}
                          onClick={() => {
                            setAspectRatio(aspectRationValue);
                          }}
                        >
                          {aspectRationValue}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <label
                className={`flex min-h-[400px] w-full rounded-lg  border-2  border-dashed items-center justify-center ${
                  false && 'animate-pulse'
                } `}
              >
                <div
                  className={`flex items-center  ${
                    loading ? 'animate-pulse' : null
                  } flex-col gap-2  justify-center`}
                >
                  <AiOutlineCloudUpload />
                  <p>{loading ? 'Uploading image...' : 'upload image'}</p>
                  {error && (
                    <p className='text-center'>
                      Error: <span className='text-red-500'>{error}</span>
                    </p>
                  )}
                </div>
                <input
                  accept='image/*, video/mp4'
                  type='file'
                  disabled={loading}
                  className='h-0 w-0 hidden'
                  onChange={e => {
                    getTemporaryUrl(e);
                  }}
                />
              </label>
            )}
          </div>

          <form
            className='w-full max-w-[548px] flex gap-3 flex-col'
            onSubmit={uploadPostToDb}
          >
            {false && (
              <p className='text-center mt-3'>Upload images of type jpeg/png/gif</p>
            )}

            <label className='w-full mb-[4px]'>
              <p className='mb-2'>Caption</p>
              <Textarea
                className='sm:rounded-xl rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'
                placeholder='Enter your post description here'
                onChange={e => setCaption(e.target.value)}
                value={caption}
              />
            </label>
            <label className='w-full mb-[4px]'>
              <p className='mb-2'>Location</p>
              <Input
                type='text'
                className='sm:rounded-xl rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'
                placeholder='Enter the location'
                onChange={e => setLocation(e.target.value)}
                value={location}
              />
            </label>
            <label className='w-full mb-[4px]'>
              <p className='mb-2'>Category</p>
              <Input
                type='text'
                className='sm:rounded-xl rounded-[0px] focus-visible:ring-0 border-neutral-800 sm:bg-[#171717] bg-transparent sm:border-none border-b-2 border-t-0 border-l-0 border-r-0 outline-none px-[16px]'
                placeholder='Enter the category'
                onChange={e => setCategory(e.target.value)}
                value={category}
              />
            </label>
            <Button
              type='submit'
              className='text-white'
              disabled={loading || postUploading}
              // onClick={getUrlsOfPost}
            >
              {postUploading ? 'Posting...' : 'Post'}
            </Button>
          </form>
        </div>
        {error && (
          <p className='text-center'>
            Error: <span className='text-red-500'>{error}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadPost;
