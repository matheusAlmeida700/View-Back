import Grade from "../models/Grade.js";

export const fetchAllGrade = async () => {
  try {
    const entries = await Grade.find();
    return entries;
  } catch (error) {
    throw new Error("Error fetching grade: " + error.message);
  }
};

export const fetchGradeById = async (id) => {
  try {
    const entry = await Grade.findById(id);
    if (!entry) {
      throw new Error("Grade entry not found");
    }
    return entry;
  } catch (error) {
    throw new Error("Error fetching grade entry by ID: " + error.message);
  }
};

export const fetchGradeByTarget = async (targetId) => {
  try {
    const entries = await Grade.find({ targetId });
    return entries;
  } catch (error) {
    throw new Error("Error fetching grade by target: " + error.message);
  }
};

export const addNewGrade = async (data) => {
  try {
    const entry = new Grade(data);
    await entry.save();
    return entry;
  } catch (error) {
    throw new Error("Error creating grade: " + error.message);
  }
};

export const modifyGradeById = async (id, data) => {
  try {
    let entry = await Grade.findById(id);

    if (!entry) {
      entry = new Grade({ _id: id, ...data });
    } else {
      Object.assign(entry, data);
    }

    await entry.save();
    return entry;
  } catch (error) {
    throw new Error("Error modifying/creating grade: " + error.message);
  }
};

export const modifyGradeByTargetId = async (targetId, data) => {
  try {
    const entry = await Grade.findOne({ targetId });

    if (!entry) {
      throw new Error("Grade entry not found.");
    }

    Object.assign(entry, data);
    await entry.save();

    return entry;
  } catch (error) {
    throw new Error("Error modifying by targetId: " + error.message);
  }
};

export const removeGradeById = async (id) => {
  try {
    const entry = await Grade.findByIdAndDelete(id);
    if (!entry) {
      throw new Error("Grade entry not found");
    }
    return { message: "Grade entry deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting grade: " + error.message);
  }
};
