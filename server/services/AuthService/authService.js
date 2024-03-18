// services/authService.js
import jwt from 'jsonwebtoken'
import UserProfilerepository from '../../repositories/UserProfileRepository.js'
import UserRepository from '../../repositories/UserRepository.js'
import { generateSaltAndHashPassword } from '../../utils/passwordUtils.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const userRepository = new UserRepository()

export const signIn = async (email, password, res) => {
  try {
    const user = await userRepository.findByEmail(email)

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const userProfileRepo = new UserProfilerepository()
    const userProfile = await userProfileRepo.getUserData(user._id)

    if (!userProfile) {
      return res.status(400).json({ error: 'User does not exist' })
    }

    const token = jwt.sign(
      {
        userID: user._id,
        userProfileId: userProfile._id,
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
    throw new Error(error.message)
  }
}

export const signUp = async (email, password, res) => {
  try {
    const alreadyUserExist = await userRepository.findByEmail(email)

    if (alreadyUserExist) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = generateSaltAndHashPassword(password)

    const newUser = await userRepository.createUser({
      email,
      password: hashedPassword,
    })

    return res.status(201).json({
      message: 'Successfully signed up',
      userProfile: { userID: newUser._id },
    })
  } catch (error) {
    throw new Error(error.message)
  }
}
