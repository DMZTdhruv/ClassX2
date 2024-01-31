<<<<<<< HEAD
import Division from "../../model/college/division.model.js"; // 
import User from "../../model/user/user.model.js";
import bcrypt from "bcrypt";
import Branch from "../../model/college/branch.model.js";
import Semester from "../../model/college/semester.model.js";
=======
// controllers/profile/createUserProfileController.js
import { createUserProfile } from "../../services/userProfileService.js";
>>>>>>> main

export const createUserProfileController = async (req, res) => {
  try {
    const user = req.user;
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

    const result = await createUserProfile(
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
      password
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
