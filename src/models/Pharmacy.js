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
    shelfRows: { type: Number, default: 0 },
    rowHeightM: { type: Number, default: 0 },
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
    row: { type: Number, default: 0 },
    offsetX: { type: Number, required: true },
    offsetY: { type: Number, default: 0 },
    width: { type: Number, required: true },
    minWidth: { type: Number, default: 0.5 },
    maxWidth: { type: Number, default: 10 },
    color: { type: String, default: "hsl(0, 0%, 80%)" },
    locked: { type: Boolean, default: false },
    opacity: { type: Number, default: 0.9 },
    labelPosition: {
      type: String,
      enum: ["top", "bottom", "center"],
      default: "top",
    },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
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
    storeSize: { type: String, enum: ["P", "M", "G"], required: true },
    scalePixelsPerMeter: { type: Number, default: 12 },
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    universes: { type: [universeSchema], required: true },
    categories: { type: [categorySchema], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Pharmacy", pharmacySchema);
