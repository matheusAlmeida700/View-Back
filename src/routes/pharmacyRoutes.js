import express from "express";
import {
  getPharmaciesByUser,
  getPharmacyById,
  createPharmacy,
  updatePharmacyById,
  deletePharmacyById,
} from "../controllers/pharmacyController.js";

const router = express.Router();

router.get("/user/:userId", getPharmaciesByUser);
router.get("/:id", getPharmacyById);
router.post("/", createPharmacy);
router.put("/:id", updatePharmacyById);
router.delete("/:id", deletePharmacyById);

export default router;
