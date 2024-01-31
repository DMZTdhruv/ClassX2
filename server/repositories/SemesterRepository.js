// repositories/SemesterRepository.js
import SemesterRepositoryInterface from "../interfaces/SemesterRepositoryInterface.js";
import Semester from "../models/college/semester.model.js";

export default class SemesterRepository extends SemesterRepositoryInterface {
  async findSemesterByNumberAndBranch(semesterNumber, branch) {
    return await Semester.findOne({
      semesterNumber,
      _id: { $in: branch.semesters },
    });
  }
}
