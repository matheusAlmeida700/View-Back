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

  const token = jwt.sign({ id: user._id }, SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      pharmacies: user.pharmacies,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
};

export const requestPasswordResetService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const resetToken = crypto.randomBytes(32).toString("hex");
  const tokenExpire = Date.now() + 15 * 60 * 1000;

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = tokenExpire;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const html = `
    <h2>Redefinição de Senha</h2>
    <p>Você solicitou uma redefinição de senha. Clique no link abaixo para criar uma nova senha:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>Esse link expira em 15 minutos.</p>
  `;

  await sendEmail(user.email, "Redefinição de senha", html);

  return { message: "Password reset email sent" };
};

export const resetPasswordService = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired token");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return { message: "Password successfully reset" };
};
