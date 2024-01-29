import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
  semesterNumber: { type: Number, required: true },
  divisions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Division" }],
});

const Semester = mongoose.model("Semester", semesterSchema);

export default Semester;
