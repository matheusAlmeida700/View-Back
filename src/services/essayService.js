import Essay from "../models/Essay.js";

export const fetchAllEssay = async () => {
  try {
    const entries = await Essay.find();
    return entries;
  } catch (error) {
    throw new Error("Error fetching essay: " + error.message);
  }
};

export const fetchEssayById = async (id) => {
  try {
    const entry = await Essay.findById(id);
    if (!entry) {
      throw new Error("Essay entry not found");
    }
    return entry;
  } catch (error) {
    throw new Error("Error fetching essay entry by ID: " + error.message);
  }
};

export const fetchEssayByTarget = async (targetId) => {
  try {
    const entries = await Essay.find({ targetId });
    return entries;
  } catch (error) {
    throw new Error("Error fetching essay by target: " + error.message);
  }
};

export const addNewEssay = async (data) => {
  try {
    const entry = new Essay(data);
    await entry.save();
    return entry;
  } catch (error) {
    throw new Error("Error creating essay: " + error.message);
  }
};

export const modifyEssayById = async (id, data) => {
  try {
    let entry = await Essay.findById(id);

    if (!entry) {
      entry = new Essay({ _id: id, ...data });
    } else {
      Object.assign(entry, data);
    }

    await entry.save();
    return entry;
  } catch (error) {
    throw new Error("Error modifying/creating essay: " + error.message);
  }
};

export const modifyEssayByTargetId = async (targetId, data) => {
  try {
    const entry = await Essay.findOne({ targetId });

    if (!entry) {
      throw new Error("Essay entry not found.");
    }

    Object.assign(entry, data);
    await entry.save();

    return entry;
  } catch (error) {
    throw new Error("Error modifying by targetId: " + error.message);
  }
};

export const removeEssayById = async (id) => {
  try {
    const entry = await Essay.findByIdAndDelete(id);
    if (!entry) {
      throw new Error("Essay entry not found");
    }
    return { message: "Essay entry deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting essay: " + error.message);
  }
};
