import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  branchName: { type: String, required: true },
  branchFullName: { type: String, required: true },
  semesters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Semester" }],
});

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;
