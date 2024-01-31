import Division from "../model/college/division.model.js"; 
import Branch from "../model/college/branch.model.js";
import UserProfile from "../model/user/userProfile.model.js";
import Semester from "../model/college/semester.model.js";

export const createUserProfileController = async (req,res) => {
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
      friends, // in the early phase a user won't have these details so it's of use.
      posts, //
      groups, // 
      email, // and we are using jwt to check this so I guess we won't need it
      password, //
    } = req.body;
    

    //check if the user profile exists or not
    const userToFind = await UserProfile.findOne({userID: userID})
    if(userToFind) return res.status(401).json({message: "User profile already exists"});

    console.log(branchName)
    const branchToFind = await Branch.findOne({branchName: branchName});
    if(!branchToFind) return res.status(401).json({message: "Branch has not yet been added to the college"});
    
    //checking if semester exists or not
    const semesterToFind = await Semester.findOne({semesterNumber: semesterNumber});
    if(!semesterToFind) return res.status(401).json({message: "Semester doesn't exist yet"});


    ///////////////////////////////////////////////////////////////////////

    //Now according to you either we may create division or idk.. it's hard to explain I will copy your code here and bro why you using let everywhere at least check the chat gpt code TT. and also tell me why you used this line TT _id: { $in: semester.divisions }, I didn't understood so TT

    ////////////////////////////////////////////////////////////////////////
    const divisionToFind = await Division.findOne({divisionName: divisionName});
    if(!divisionToFind) {
      const newDivision = new Division({
        divisionName: divisionName,
      })

      const savedDivision = await newDivision.save()
      res.status(201).json({message: "New division was made", division: savedDivision});

      //pushing a new division in the semester schema
      semesterToFind.divisions.push(savedDivision._id);
      await semesterToFind.save();
    }
    
    //pushing a division that exist already  in the semester schema
    //hey i'm not sure here, if the division exist we should not push right?
    semesterToFind.divisions.push(divisionToFind._id);
    await semesterToFind.save();


    //Create if a user profile  doesn't exist
    const newUserProfile = new UserProfile({
      // giving reference of user model to userProfile through middleware jwt
      userID: user.userId,
      name,
      enrollmentNumber,
      branches: [branchToFind._id],
      semesterNumber,
      isPrivate,
    })

   
    const savedUserProfile = await newUserProfile.save();
    return res.status(201).json({message: "Successfully created new user profile", userProfile: savedUserProfile})

  } catch (err) {
    res.status(500).json({message: "error", err: err.message});
  }
}