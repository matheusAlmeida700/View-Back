import {
  fetchAllEssay,
  fetchEssayById,
  fetchEssayByTarget,
  addNewEssay,
  modifyEssayById,
  removeEssayById,
  modifyEssayByTargetId,
} from "../services/essayService.js";
import { essaySchema } from "../utils/validators.js";

export const getAllEssay = async (req, res, next) => {
  try {
    const entries = await fetchAllEssay();
    res.json({ entries });
  } catch (error) {
    next(error);
  }
};

export const getEssayById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entry = await fetchEssayById(id);
    res.json({ entry });
  } catch (error) {
    next(error);
  }
};

export const getEssayByTarget = async (req, res, next) => {
  try {
    const { targetId } = req.params;
    const entries = await fetchEssayByTarget(targetId);
    res.json({ entries });
  } catch (error) {
    next(error);
  }
};

export const createEssay = async (req, res, next) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const errors = [];
      for (const item of data) {
        const { error } = essaySchema.validate(item, {
          abortEarly: false,
        });
        if (error) {
          errors.push(...error.details.map((err) => err.message));
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const created = await Promise.all(data.map(addNewEssay));
      return res.status(201).json({ created });
    } else {
      const { error } = essaySchema.validate(data, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((err) => err.message) });
      }

      const newEntry = await addNewEssay(data);
      return res.status(201).json({ newEntry });
    }
  } catch (error) {
    next(error);
  }
};

export const updateEssayById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEntry = await modifyEssayById(id, req.body);
    const status =
      updatedEntry.createdAt === updatedEntry.updatedAt ? 201 : 200;
    res.status(status).json({ updatedEntry });
  } catch (error) {
    next(error);
  }
};

export const updateEssayByTargetId = async (req, res, next) => {
  try {
    const { targetId } = req.params;
    const updatedEntry = await modifyEssayByTargetId(targetId, req.body);
    res.status(200).json({ updatedEntry });
  } catch (error) {
    next(error);
  }
};

export const deleteEssayById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await removeEssayById(id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
