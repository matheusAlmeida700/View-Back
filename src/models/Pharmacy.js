import mongoose from "mongoose";

const universeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    color: { type: String, default: "hsl(0, 0%, 80%)" },
    opacity: { type: Number, default: 0.75 },
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    universeId: { type: String, required: true },
    offsetX: { type: Number, required: true },
    width: { type: Number, required: true },
    minWidth: { type: Number, required: true },
    maxWidth: { type: Number, required: true },
    color: { type: String, default: "hsl(0, 0%, 80%)" },
    locked: { type: Boolean, default: false },
    opacity: { type: Number, default: 0.9 },
  },
  { _id: false }
);

const pharmacySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    storeSize: { type: String, enum: ["P", "M", "G"], default: "G" },
    scalePixelsPerMeter: { type: Number, default: 12 },
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    universes: [universeSchema],
    categories: [categorySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Pharmacy", pharmacySchema);
