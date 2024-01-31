// repositories/BranchRepository.js
import BranchRepositoryInterface from "../interfaces/BranchRepositoryInterface.js";
import Branch from "../models/college/branch.model.js";

export default class BranchRepository extends BranchRepositoryInterface {
  async findBranchByName(branchName) {
    return await Branch.findOne({ branchName });
  }
}
