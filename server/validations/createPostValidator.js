// validate create post user input

export const validateCreatePostInput = (
  title,
  imageUrl,
  caption,
  category,
  postedBy
) => {
  if (!title || !imageUrl || !caption || !category || !postedBy) {
    throw new Error('Incomplete post details')
  }
}