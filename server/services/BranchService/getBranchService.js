import BranchRepository from "../../repositories/BranchRepository.js"

export const getBranchService = async user => {
  try {
    const branchRepository = new BranchRepository();
    const getBranches = await branchRepository.getBranchNames();
    return {
      data: getBranches
    }
  }catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
}
