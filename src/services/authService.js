import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secreto_dev";

export const registerUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = new User({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  await newUser.save();
  return { id: newUser._id, name: newUser.name, email: newUser.email };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};
