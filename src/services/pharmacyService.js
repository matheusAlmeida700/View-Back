import Pharmacy from "../models/Pharmacy.js";
import { pharmacySchema } from "../utils/validators.js";

export const fetchPharmaciesByUser = async (userId) => {
  try {
    const entries = await Pharmacy.find({ userId });
    return entries;
  } catch (error) {
    throw new Error("Error fetching pharmacies by user: " + error.message);
  }
};

export const fetchPharmacyById = async (id) => {
  try {
    const entry = await Pharmacy.findById(id);
    if (!entry) throw new Error("Pharmacy not found");
    return entry;
  } catch (error) {
    throw new Error("Error fetching pharmacy by ID: " + error.message);
  }
};

export const addNewPharmacy = async (data) => {
  try {
    await pharmacySchema.validateAsync(data, { abortEarly: false });
    const entry = new Pharmacy(data);
    await entry.save();
    return entry;
  } catch (error) {
    throw new Error("Error creating pharmacy: " + error.message);
  }
};

export const modifyPharmacyById = async (id, data) => {
  try {
    await pharmacySchema.validateAsync(data, { abortEarly: false });
    const entry = await Pharmacy.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      upsert: false,
    });
    if (!entry) throw new Error("Pharmacy not found");
    return entry;
  } catch (error) {
    throw new Error("Error modifying pharmacy: " + error.message);
  }
};

export const removePharmacyById = async (id) => {
  try {
    const entry = await Pharmacy.findByIdAndDelete(id);
    if (!entry) throw new Error("Pharmacy not found");
    return { message: "Pharmacy deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting pharmacy: " + error.message);
  }
};
