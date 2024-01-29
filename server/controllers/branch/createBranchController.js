import Branch from "../../model/college/branch.model.js";
import Semester from "../../model/college/semester.model.js";

export const createBranchController = async (req, res) => {
  try {
    const { branchName, branchFullName, numberOfSemesters } = req.body;

    // Check if the branch already exists
    const existingBranch = await Branch.findOne({ branchName });

    if (existingBranch) {
      return res
        .status(400)
        .json({ message: "Branch with the same name already exists" });
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

    res.status(201).json({
      message: "Branch and semesters created successfully",
      branch: newBranch,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
