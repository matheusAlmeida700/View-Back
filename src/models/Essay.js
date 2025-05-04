import mongoose from "mongoose";

const EssaySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 5, maxlength: 7000 },
    content: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    correctedAt: { type: Date, default: null },
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Essay", EssaySchema);
