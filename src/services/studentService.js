import Student from "../models/Student.js";

export const fetchAllStudents = async () => {
  try {
    const data = await Student.find();
    return data;
  } catch (error) {
    throw new Error("Error fetching students: " + error.message);
  }
};

export const fetchStudentById = async (id) => {
  try {
    const student = await Student.findById(id);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  } catch (error) {
    throw new Error("Error fetching student by ID: " + error.message);
  }
};

export const addNewStudent = async (data, userId) => {
  try {
    const student = new Student({ ...data, userId });
    await student.save();
    return student;
  } catch (error) {
    throw new Error("Error creating student: " + error.message);
  }
};

export const addMultipleStudents = async (dataArray, userId) => {
  try {
    const studentsWithUser = dataArray.map((item) => ({ ...item, userId }));
    const students = await Student.insertMany(studentsWithUser);
    return students;
  } catch (error) {
    throw new Error("Error creating students: " + error.message);
  }
};

export const modifyStudentById = async (id, data) => {
  try {
    const student = await Student.findByIdAndUpdate(id, data, { new: true });
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  } catch (error) {
    throw new Error("Error updating student: " + error.message);
  }
};

export const removeStudentById = async (id) => {
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      throw new Error("Student not found");
    }
    return { message: "Student deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting student: " + error.message);
  }
};
