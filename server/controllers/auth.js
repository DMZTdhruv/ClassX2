import User from "../model/user/user.model.js"
import bcrypt from "bcrypt"

export const userSignUpController = async (req,res) => {
  try {
    const {email, password} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password,salt)

    const newUser = new User({
      email: email,
      password: hashedPassword
    })

    const savedUser = await newUser.save()
    res.status(201).json({message: "User is created", user: {email: savedUser.email, userId: savedUser._id}});
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

export const userSingInController = async (req,res) => {
  try {
    const {email,password} = req.body;
    const userToFind = await User.findOne({email: email})
    if(!userToFind) return res.status(404).json({message: "User not found"})
    
    const passwordMatch = bcrypt.compareSync(password,userToFind.password)
    
    if(passwordMatch) return res.status(200).json({message: "Successful logged in", user: {email: userToFind.email, userId: userToFind._id}});
    res.status(401).json({message: "Invalid credentials"})
  } catch (err) {
    res.status(500).json({message: err.message})
  } 
}