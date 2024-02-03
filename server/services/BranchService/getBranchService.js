import BranchRepository from "../../repositories/BranchRepository.js"

export const getBranchService = async user => {
  try {
    if (!user) {
      throw new Error("User token doesn't exist")
    }

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
