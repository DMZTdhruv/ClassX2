// services/authService.js
import jwt from "jsonwebtoken";
import UserRepository from "../../repositories/UserRepository.js";
import { generateSaltAndHashPassword } from "../../utils/passwordUtils.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config();


const userRepository = new UserRepository();

export const signIn = async (email, password) => {
  try {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    // Generate and return a JWT token
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return { message: "Successful logged in", token };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signUp = async (email, password) => {
  try {
    const alreadyUserExist = await userRepository.findByEmail(email);

    if (alreadyUserExist) {
      throw new Error("User with the same email already exists");
    }

    const hashedPassword = generateSaltAndHashPassword(password);

    const newUser = await userRepository.createUser({
      email,
      password: hashedPassword,
    });

    // Generate and return a JWT token
    const token = jwt.sign({ userID: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return { message: "User is created", token };
  } catch (error) {
    throw new Error(error.message);
  }
};
