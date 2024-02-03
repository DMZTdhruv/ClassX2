// interfaces/SemesterRepositoryInterface.js
export default class SemesterRepositoryInterface {
  async findSemesterByNumberAndBranch(semesterNumber, branch) {
    throw new Error("Method not implemented");
  }

  async findSemesterNumberByBranchName (branchName) {
    throw new Error("Method not implemented")
  }
}
