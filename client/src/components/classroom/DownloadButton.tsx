'use client'

import React from 'react'
import { MdOutlineFileDownload } from 'react-icons/md'

const DownloadButton = ({ file }: { file: { url: string } }) => {
  const handleDownload = () => {
    window.open(file.url, '_blank')
  }

  return (
    <button
      onClick={handleDownload}
      className='flex items-center gap-2 text-neutral-300 hover:text-neutral-200 focus:outline-none'
    >
      <MdOutlineFileDownload size={24} />
    </button>
  )
}

export default DownloadButton
