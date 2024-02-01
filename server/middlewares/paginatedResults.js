export const paginatedResults = model => {
  return async (req, res, next) => {
    try {
      const { page, limit } = req.query
      const currentPage = parseInt(page) || 1
      const itemsPerPage = parseInt(limit) || 10

      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage

      const results = await model.find().skip(startIndex).limit(endIndex)
      res.paginatedResults = results
      next()
    } catch (error) {
      console.error(error)
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
      }
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
