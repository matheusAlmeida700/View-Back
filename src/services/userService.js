import User from "../models/User.js";

export const fetchAllUsers = async () => {
  try {
    const data = await User.find();
    return data;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export const fetchUserById = async (id) => {
  try {
    const user = await user.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user by ID: " + error.message);
  }
};

export const addNewUser = async (data) => {
  try {
    const user = new User(data);
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

export const modifyUserById = async (id, data) => {
  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

export const removeUserById = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};
