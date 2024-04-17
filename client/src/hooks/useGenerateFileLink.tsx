import { SanityAssetDocument } from '@sanity/client'
import client from '../../client'
import { useState } from 'react'

const useGenerateFileLink = () => {
  const [sanityError, setSanityError] = useState<string>('')

  const generateTempFileUrl = async (e: any) => {
    const { type, name } = e.target.files[0]
    try {
      if (
        type === 'application/pdf' ||
        type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        type === 'application/vnd.ms-powerpoint'
      ) {
        const file = await client.assets.upload('file', e.target.files[0], {
          contentType: type,
          filename: name,
        })

        return file
      } else {
        throw new Error(`Invalid file type`)
      }
    } catch (error: any) {
      console.error(error.message)
      setSanityError(error.message)
      setTimeout(() => {
        setSanityError('')
      }, 5000)
    }
  }

  const getFile = async (file: SanityAssetDocument) => {
    const doc = {
      _type: 'classwork',
      file: {
        type: 'file',
        asset: {
          _type: 'reference',
          _ref: file._id,
        },
      },
    }
    try {
      const createFile = await client.create(doc)
      const file = await client.fetch(
        `*[_id == '${createFile.file.asset._ref}']{_id, originalFilename, extension, url}`
      )
      return file[0]
    } catch (error: any) {
      console.error(error.message)
      setSanityError(error.message)
      setTimeout(() => {
        setSanityError('')
      }, 5000)
    }
  }

  return {
    generateTempFileUrl,
    getFile,
    sanityError,
  }
}

export default useGenerateFileLink
