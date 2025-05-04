import {
  fetchAllStudents,
  fetchStudentById,
  addNewStudent,
  addMultipleStudents,
  modifyStudentById,
  removeStudentById,
} from "../services/studentService.js";
import { studentSchema } from "../utils/validators.js";

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await fetchAllStudents();
    res.json({ students });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await fetchStudentById(id);
    res.json({ student });
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.body.userId;

    if (Array.isArray(data)) {
      const errors = [];

      for (const item of data) {
        const { error } = studentSchema.validate(item, { abortEarly: false });
        if (error) {
          errors.push(...error.details.map((err) => err.message));
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const newStudents = await addMultipleStudents(data, userId);
      return res.status(201).json({ newStudents });
    } else {
      const { error } = studentSchema.validate(data, { abortEarly: false });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((err) => err.message) });
      }

      const newStudent = await addNewStudent(data, userId);
      return res.status(201).json({ newStudent });
    }
  } catch (error) {
    next(error);
  }
};

export const updateStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedStudent = await modifyStudentById(id, updatedData);
    res.status(200).json({ updatedStudent });
  } catch (error) {
    next(error);
  }
};

export const deleteStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await removeStudentById(id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
