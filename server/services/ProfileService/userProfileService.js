import UserProfileRepository from '../../repositories/UserProfileRepository.js'
import BranchRepository from '../../repositories/BranchRepository.js'
import SemesterRepository from '../../repositories/SemesterRepository.js'
import DivisionRepository from '../../repositories/DivisionRepository.js'
import { validateUserProfileInput } from '../../validations/ProfileValidators/userProfileValidation.js'
import UserProfile from '../../models/user/userProfile.model.js'
import UserRepository from '../../repositories/UserRepository.js'
import jwt from 'jsonwebtoken'

const userProfileRepository = new UserProfileRepository()
const userRepository = new UserRepository()

const createUserProfileInstance = async (
  userID,
  name,
  username,
  about,
  userProfileImage,
  enrollmentNumber,
  branches,
  isPrivate,
  semesterNumber,
  division,
  friends,
  posts,
  groups,
  res
) => {
  try {
    const existingUserProfile = await userProfileRepository.findByUserID(userID)
    const existingUsername = await userProfileRepository.findByUsername(username)

    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    if (existingUserProfile) {
      return res.status(400).json({ error: 'User Profile already exists' })
    }

    return new UserProfile({
      userID,
      name,
      username,
      about,
      userProfileImage,
      enrollmentNumber,
      branches,
      isPrivate,
      semesterNumber,
      division,
      friends,
      posts,
      groups,
    })
  } catch (error) {
    console.error(error.message)
    res.status(404).json({ error: error.message })
    throw new Error(error.message)
  }
}

export const createUserProfile = async (
  userID,
  name,
  username,
  about,
  userProfileImage,
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
  res
) => {
  try {
    validateUserProfileInput(
      userID,
      name,
      username,
      about,
      userProfileImage,
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
      res
    )

    const branchRepository = new BranchRepository()
    const semesterRepository = new SemesterRepository()
    const divisionRepository = new DivisionRepository()

    const branch = await branchRepository.findBranchByName(branchName)
    const semester = await semesterRepository.findSemesterByNumberAndBranch(
      semesterNumber,
      branch
    )

    const division = await divisionRepository.findOrCreateDivision(
      divisionName,
      semester
    )

    const userProfileInstance = await createUserProfileInstance(
      userID,
      name,
      username,
      about,
      userProfileImage,
      enrollmentNumber,
      [branch._id],
      isPrivate,
      [semester._id],
      [division._id],
      friends,
      posts,
      groups,
      res
    )

    const user = await userRepository.findByID(userID)
    user.userProfile = userProfileInstance._id
    await userRepository.save(user)
    const userProfile = await userProfileRepository.save(userProfileInstance)

    const token = jwt.sign(
      {
        userID: user._id,
        userProfileId: userProfileInstance._id,
        userProfileImage: userProfileInstance.userProfileImage
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    )

    if (process.env.NODE_ENV === 'development') {
      res.cookie('classX_user_token', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
      })
    } else {
      res.cookie('classX_user_token', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'Strict',
        domain: '.railway.app',
        secure: process.env.NODE_ENV !== 'development',
      })
    }
    return res.status(201).json({
      message: 'Successfully signed in',
      userProfile: {
        userID: user._id,
        userProfileId: userProfile._id,
        username: userProfile.username,
        userProfileImage: userProfile.userProfileImage,
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}
