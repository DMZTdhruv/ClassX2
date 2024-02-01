

export const getAllPostService = async paginatedResults => {
  try {
    return {
      message: paginatedResults,
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
