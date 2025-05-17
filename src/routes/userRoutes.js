import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "../controllers/userController.js";
import {
  postLessonProgress,
  putStreak,
  putAchievements,
  putXP,
} from "../controllers/userProgressController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

router.post("/:id/progress", postLessonProgress);

router.put("/:id/streak", putStreak);

router.put("/:id/achievements", putAchievements);

router.put("/:id/xp", putXP);

export default router;
