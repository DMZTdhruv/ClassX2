// services/branchService.js
import Branch from "../models/college/branch.model.js";
import Semester from "../models/college/semester.model.js";

export const createBranch = async (
  branchName,
  branchFullName,
  numberOfSemesters
) => {
  try {
    // Check if the branch already exists
    const existingBranch = await Branch.findOne({ branchName });

    if (existingBranch) {
      throw new Error("Branch with the same name already exists");
    }

    // Create a new branch
    const newBranch = new Branch({ branchName, branchFullName });
    await newBranch.save();

    // Create semesters for the branch
    for (let i = 1; i <= numberOfSemesters; i++) {
      const newSemester = new Semester({ semesterNumber: i });
      await newSemester.save();

      // Add the new semester to the branch
      newBranch.semesters.push(newSemester._id);
    }

    // Save the branch with the added semesters
    await newBranch.save();

    return {
      message: "Branch and semesters created successfully",
      branch: newBranch,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Add other branch-related methods as needed
