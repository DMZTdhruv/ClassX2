import UserProfile from "../../model/user/userProfile.model.js"; // Adjust the path as needed
import Branch from "../../model/college/branch.model.js"; // Adjust the path as needed
import Semester from "../../model/college/semester.model.js"; // Adjust the path as needed
import Division from "../../model/college/division.model.js"; // Adjust the path as needed
import mongoose from "mongoose";
import User from "../../model/user/user.model.js";
import bcrypt from "bcrypt";

export const createUserProfileController = async (req, res) => {
  try {
    const {
      userID,
      name,
      enrollmentNumber,
      branchName,
      semesterNumber,
      divisionName,
      isPrivate,
      friends,
      posts,
      groups,
      email,
      password,
    } = req.body;

    const existingUserProfile = await UserProfile.findOne({ userID });

    if (existingUserProfile) {
      return res.status(400).json({ message: "User Profile already exists" });
    }
    // Find or create the branch
    let branch = await Branch.findOne({ branchName });

    if (!branch) {
      return res.status(400).json({ message: "Branch not exists" });
    }

    // Find or create the semester within the branch
    let semester = await Semester.findOne({
      semesterNumber,
      _id: { $in: branch.semesters },
    });

    if (!semester) {
      return res.status(400).json({ message: "semester not exists" });
    }

    // Find or create the division within the semester
    let division = await Division.findOne({
      divisionName,
      _id: { $in: semester.divisions },
    });

    if (!division) {
      division = new Division({ divisionName });
      await division.save();

      // Add the division to the semester
      semester.divisions.push(division._id);
      await semester.save();
    }

    const userToFind = await User.findOne({ email: email });
    if (!userToFind) return res.status(404).json({ message: "User not found" });

    const passwordMatch = bcrypt.compareSync(password, userToFind.password);

    // Create the user profile
    if (passwordMatch) {
      const newUserProfile = new UserProfile({
        userID,
        name,
        enrollmentNumber,
        branches: [branch._id],
        isPrivate,
        friends,
        posts,
        groups,
        email,
        password,
      });

      const savedUserProfile = await newUserProfile.save();

      res.status(201).json({
        message: "User Profile created successfully",
        userProfile: savedUserProfile,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
