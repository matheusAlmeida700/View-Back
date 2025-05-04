import express from "express";
import {
  getAllEssay,
  getEssayById,
  getEssayByTarget,
  createEssay,
  updateEssayById,
  deleteEssayById,
  updateEssayByTargetId,
} from "../controllers/essayController.js";

const router = express.Router();

router.get("/", getAllEssay);
router.get("/:id", getEssayById);
router.get("/target/:targetId", getEssayByTarget);
router.post("/", createEssay);
router.put("/:id", updateEssayById);
router.put("/target/:targetId", updateEssayByTargetId);
router.delete("/:id", deleteEssayById);

export default router;
