// repositories/SemesterRepository.js
import SemesterRepositoryInterface from "../interfaces/SemesterRepositoryInterface.js";
import Semester from "../models/college/semester.model.js";
import Branch from "../models/college/branch.model.js";

export default class SemesterRepository extends SemesterRepositoryInterface {
  async findSemesterByNumberAndBranch(semesterNumber, branch) {
    return await Semester.findOne({
      semesterNumber,
      _id: { $in: branch.semesters },
    });
  }

  async findSemesterNumberByBranchName(branchName) {
    const ans =  await Branch.findOne({branchName: branchName},'semesters').populate('semesters', 'semesterNumber');
    return ans;
  }
}
