import {
  fetchPharmaciesByUser,
  fetchPharmacyById,
  addNewPharmacy,
  modifyPharmacyById,
  removePharmacyById,
} from "../services/pharmacyService.js";
import { pharmacySchema } from "../utils/validators.js";

export const getPharmaciesByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const entries = await fetchPharmaciesByUser(userId);
    res.json({ entries });
  } catch (error) {
    next(error);
  }
};

export const getPharmacyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entry = await fetchPharmacyById(id);
    res.json({ entry });
  } catch (error) {
    next(error);
  }
};

export const createPharmacy = async (req, res, next) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const errors = [];
      for (const item of data) {
        const { error } = pharmacySchema.validate(item, {
          abortEarly: false,
        });
        if (error) {
          errors.push(...error.details.map((err) => err.message));
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const created = await Promise.all(data.map(addNewPharmacy));
      return res.status(201).json({ created });
    } else {
      const { error } = pharmacySchema.validate(data, { abortEarly: false });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((err) => err.message) });
      }

      const newEntry = await addNewPharmacy(data);
      return res.status(201).json({ newEntry });
    }
  } catch (error) {
    next(error);
  }
};

export const updatePharmacyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = pharmacyUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const updatedEntry = await Pharmacy.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEntry)
      return res.status(404).json({ message: "Pharmacy not found" });

    res.status(200).json(updatedEntry);
  } catch (error) {
    next(error);
  }
};

export const deletePharmacyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await removePharmacyById(id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
