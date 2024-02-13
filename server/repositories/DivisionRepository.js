import DivisionRepositoryInterface from "../interfaces/DivisionRepositoryInterface.js";
import Division from "../models/college/division.model.js";

export default class DivisionRepository extends DivisionRepositoryInterface {
  async findOrCreateDivision(divisionName, semester) {
    let division = await Division.findOne({
      divisionName,
      _id: { $in: semester.divisions },
    });

    if (!division) {
      division = new Division({ divisionName });
      await division.save();

      // Add the division to the semester
      semester.divisions.push(division._id);
      await semester.save();
    }

    return division;
  }

  async findDivisionByName(divisionName) {
    await Division.findOne({divisionName})
  }
}
