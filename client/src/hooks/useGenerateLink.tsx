import client from '../../client'

export const useGenerateLink = () => {
  const generateUrl = async (e: any) => {
    const { type, name } = e.target.files[0]

    if (
      type === 'image/jpeg' ||
      type === 'image/png' ||
      type === 'image/gif' ||
      type === 'image/svg+xml'
    ) {
      try {
        const file = await client.assets.upload('image', e.target.files[0], {
          contentType: type,
          filename: name,
        })
        return file
      } catch (err: any) {
        console.log(err.message)
      }
    } else {
      throw new Error('image type is not valid')
    }
  }

  const getUrl = async (file: any) => {
    const doc = {
      _type: 'Image',
      image: {
        type: 'Image',
        asset: {
          _type: 'reference',
          _ref: file._id,
        },
      },
    }

    try {
      const createImage = await client.create(doc)
      const url = await client.fetch(`*[_id == '${createImage.image.asset._ref}']{url}`)
      return url[0].url
    } catch (err) {
      console.log(err)
    }
  }

  const getUrlImageObj = async (file: any) => {
    const doc = {
      _type: 'Image',
      image: {
        type: 'Image',
        asset: {
          _type: 'reference',
          _ref: file._id,
        },
      },
    }

    try {
      const createImage = await client.create(doc)
      const url = await client.fetch(
        `*[_id == '${createImage.image.asset._ref}']{_id, originalFilename, extension, url, _createdAt}`
      )
      return url
    } catch (err) {
      console.log(err)
    }
  }

  return {
    generateUrl,
    getUrl,
    getUrlImageObj,
  }
}
