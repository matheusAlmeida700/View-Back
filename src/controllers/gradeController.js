import {
  fetchAllGrade,
  fetchGradeById,
  fetchGradeByTarget,
  addNewGrade,
  modifyGradeById,
  removeGradeById,
  modifyGradeByTargetId,
} from "../services/gradeService.js";
import { gradeSchema } from "../utils/validators.js";

export const getAllGrade = async (req, res, next) => {
  try {
    const entries = await fetchAllGrade();
    res.json({ entries });
  } catch (error) {
    next(error);
  }
};

export const getGradeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entry = await fetchGradeById(id);
    res.json({ entry });
  } catch (error) {
    next(error);
  }
};

export const getGradeByTarget = async (req, res, next) => {
  try {
    const { targetId } = req.params;
    const entries = await fetchGradeByTarget(targetId);
    res.json({ entries });
  } catch (error) {
    next(error);
  }
};

export const createGrade = async (req, res, next) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const errors = [];
      for (const item of data) {
        const { error } = gradeSchema.validate(item, {
          abortEarly: false,
        });
        if (error) {
          errors.push(...error.details.map((err) => err.message));
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const created = await Promise.all(data.map(addNewGrade));
      return res.status(201).json({ created });
    } else {
      const { error } = gradeSchema.validate(data, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((err) => err.message) });
      }

      const newEntry = await addNewGrade(data);
      return res.status(201).json({ newEntry });
    }
  } catch (error) {
    next(error);
  }
};

export const updateGradeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEntry = await modifyGradeById(id, req.body);
    const status =
      updatedEntry.createdAt === updatedEntry.updatedAt ? 201 : 200;
    res.status(status).json({ updatedEntry });
  } catch (error) {
    next(error);
  }
};

export const updateGradeByTargetId = async (req, res, next) => {
  try {
    const { targetId } = req.params;
    const updatedEntry = await modifyGradeByTargetId(targetId, req.body);
    res.status(200).json({ updatedEntry });
  } catch (error) {
    next(error);
  }
};

export const deleteGradeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await removeGradeById(id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
