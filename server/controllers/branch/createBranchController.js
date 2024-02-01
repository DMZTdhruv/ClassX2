// controllers/branch/createBranchController.js
import { createBranch } from '../../services/BranchService/branchService.js'

export const createBranchController = async (req, res) => {
  try {
    const { branchName, branchFullName, numberOfSemesters } = req.body
    const result = await createBranch(
      branchName,
      branchFullName,
      numberOfSemesters
    )
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
