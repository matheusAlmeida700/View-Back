import {
  fetchAllUsers,
  fetchUserById,
  addNewUser,
  modifyUserById,
  removeUserById,
} from "../services/userService.js";
import { userSchema } from "../utils/validators.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users: " + error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await fetchUserById(id);
    res.json({ user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }
    const newUser = await addNewUser(req.body);
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user: " + error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await modifyUserById(id, req.body);
    res.json({ updatedUser });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await removeUserById(id);
    res.json(message);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
