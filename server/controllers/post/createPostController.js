import {createPostService}  from "../../services/createPostService.js";

export const createPostController = async (req,res) => {
  try {
    const currentUser = req.user;
    const {
      title,
      imageUrl,
      caption,
      location,
      category,
      postedBy, // client will send the userId
    } = req.body;

    const createdPost =  await createPostService(
      currentUser,
      title,
      imageUrl,
      caption,
      location,
      category,
      postedBy,
    )

    res.status(201).json(createdPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}