import mongoose from "mongoose";

const EssaySchema = new mongoose.Schema(
  {
    title: { type: String, required: false, maxlength: 500 },
    theme: { type: String, required: true, minlength: 5, maxlength: 500 },
    content: { type: String, required: true, minlength: 140, maxlength: 7000 },
    feedback: { type: String, required: false },
    correctedAt: { type: Date, default: Date.now },
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Essay", EssaySchema);
