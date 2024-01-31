// services/UserService.js
import bcrypt from "bcrypt";
import UserRepository from "../repositories/UserRepository.js";

const userRepository = new UserRepository();

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async checkUserExistsByID(userID) {
    return this.userRepository.findByID(userID);
  }

  async checkPasswordMatch(userID, password) {
    const user = await this.checkUserExistsByID(userID);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
  }
}

export const userService = new UserService(new UserRepository());
