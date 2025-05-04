import express from "express";
import {
  getAllGrade,
  getGradeById,
  getGradeByTarget,
  createGrade,
  updateGradeById,
  deleteGradeById,
  updateGradeByTargetId,
} from "../controllers/gradeController.js";

const router = express.Router();

router.get("/", getAllGrade);
router.get("/:id", getGradeById);
router.get("/target/:targetId", getGradeByTarget);
router.post("/", createGrade);
router.put("/:id", updateGradeById);
router.put("/target/:targetId", updateGradeByTargetId);
router.delete("/:id", deleteGradeById);

export default router;
