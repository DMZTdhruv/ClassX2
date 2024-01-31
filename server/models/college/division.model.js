import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema({
  divisionName: { type: String, required: true },
});

const Division = mongoose.model("Division", divisionSchema);

export default Division;
