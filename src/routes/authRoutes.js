import express from "express";
import {
  login,
  register,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/reset-password-request", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
