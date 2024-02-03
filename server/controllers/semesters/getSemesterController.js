import { getSemesterService } from "../../services/Semester/getSemesterService.js";

export const getSemesterNumberController = async (req, res) => {
  const {branchName} = req.query;
  try {
    const result = await getSemesterService(branchName);
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({message: err.message})
  } 
}

