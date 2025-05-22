import express from "express";
import {
  getAllPost,
  getPostById,
  getPostByTargetId,
  createPost,
  updatePostById,
  deletePostById,
  updatePostByTargetId,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPost);
router.get("/:id", getPostById);
router.get("/target/:targetId", getPostByTargetId);
router.post("/", createPost);
router.put("/:id", updatePostById);
router.put("/target/:targetId", updatePostByTargetId);
router.delete("/:id", deletePostById);

router.post("/:postId/answer", addAnswer);
router.put("/:postId/answer/:answerId", updateAnswer);
router.delete("/:postId/answer/:answerId", deleteAnswer);

export default router;
