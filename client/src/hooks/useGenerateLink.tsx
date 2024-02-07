import client from "../../client";

export const useGenerateLink = () => {
  const generateUrl = async (e: any) => {
    const { type, name } = e.target.files[0];

    if (type === 'image/jpeg' || type === 'image/png') {
      try {
        const file = await client.assets.upload('image', e.target.files[0], { contentType: type, filename: name });
        const url = getUrl(file);
        return url;
      } catch (err: any) {
        console.log(err.message)
      }
    } else {
      console.log("Hello from error")
      throw new Error("image type is not valid")
    }

  }

  const getUrl = async (file: any) => {
    console.log(file._id)
    const doc = {
      _type: 'Image',
      image: {
        type: 'Image',
        asset: {
          _type: 'reference',
          _ref: file._id
        }
      }
    }

    try {
      const createImage = await client.create(doc);
      const url = await client.fetch(`*[_id == '${createImage.image.asset._ref}']{url}`);
      return url[0].url;
    } catch (err) {
      console.log(err)
    }
  }

  return {
    generateUrl
  }
}