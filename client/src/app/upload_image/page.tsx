'use client'

import React, { FormEvent, useState } from 'react'
import client from '../../../client.js'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

function page() {
  const [imageAsset, setImageAsset] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false);
  console.log(process.env.NEXT_PUBLIC_SANITY_ID)

  const handleUploadImage = (e: any) => {
    const { type, name } = e.target.files[0]
    console.log(type, name);
    if (
      type === 'image/png' ||
      type === 'image/svg' ||
      type === 'image/jpeg' ||
      type === 'image/gif'
    ) {
      setIsLoading(true)
      client.assets.upload('image',e.target.files[0], {contentType: type, filename: name}).then((data) =>{
        console.log(data);
      }).then((data) => {
        console.log(data);
      })
     
    }
  }

  const uploadImage = () => {
    setIsUploading(true);
    const doc = {
      _type: 'Image',
      image: {
        type: 'Image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id
        }
      }
    }
    client.create(doc).then((doc) => {
      console.log(doc);
      setIsUploading(false)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsUploading(false);
    })
  }

  return (
    <div className='gradient'>
      <div className='h-full w-full flex items-center justify-center gap-3'>
        <label className='px-[36px]   w-[500px] h-[300px] rounded-lg  border-dashed border-2 flex-col justify-evenly  border-neutral-600 flex items-center'>
          <p>{isLoading ? "Uploading image..." : "click to upload an image"}</p>
          <Input
            type='file'
            name='upload-image'
            onChange={handleUploadImage}
            className='h-0 w-0 border-none hidden'
          />
        </label>

        <div className=' flex flex-col gap-3'>
          <img src={imageAsset?.url} alt="uploaded-pic" className=' object-cover  h-[300px] w-[300px] rounded-lg' />
          <Button type='button' className='text-white' onClick={uploadImage}>{isUploading ? "Uploading" : 'Upload'}</Button>
        </div>
      </div>
    </div>
  )
}

export default page
