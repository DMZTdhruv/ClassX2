import BranchRepository from "../../repositories/BranchRepository.js";
import SemesterRepository from "../../repositories/SemesterRepository.js";

export const getSemesterService = async (branchName) => {
  try {
    const semesterRepository  = new SemesterRepository();    const result = await semesterRepository.findSemesterNumberByBranchName(branchName);

    if (!result) {
      throw new Error("Branch does not exist");
    }

    return {
      data: result,
    };
  } catch (error) {
    console.error(error); 
    return {
      error: "An error occurred while processing the request",
    };
  }
};
