// controllers/profile/createUserProfileController.js
import { createUserProfile } from "../../services/userProfileService.js";

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
      user,
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
