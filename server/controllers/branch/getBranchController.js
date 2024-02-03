import { getBranchService } from "../../services/BranchService/getBranchService.js";

export const getBranchController = async(req,res) => {
  const user = req.user;
  try {
    const result = await getBranchService(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error)
  }
}