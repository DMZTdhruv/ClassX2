// repositories/UserRepository.js
import User from "../models/user/user.model.js";
import UserRepositoryInterface from "../interfaces/UserRepositoryInterface.js";

class UserRepository extends UserRepositoryInterface {
  async findByID(userID) {
    return User.findOne({ _id: userID });
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async save(user) {
    return user.save();
  }

  async createUser(userData) {
    const newUser = new User(userData);
    return this.save(newUser);
  }
}

export default UserRepository;
