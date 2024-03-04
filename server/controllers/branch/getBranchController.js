import { getBranchService } from "../../services/BranchService/getBranchService.js";

export const getBranchController = async(req,res) => {
  try {
    const result = await getBranchService();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error)
  }
}