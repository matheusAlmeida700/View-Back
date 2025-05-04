import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema(
  {
    overallScore: { type: Number, required: true, min: 0, max: 1000 },
    criteria: {
      argumentation: { type: Number, default: 0, min: 0, max: 200 },
      coherence: { type: Number, default: 0, min: 0, max: 200 },
      grammar: { type: Number, default: 0, min: 0, max: 200 },
      structure: { type: Number, default: 0, min: 0, max: 200 },
    },
    feedback: { type: String },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    essayId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Grade", GradeSchema);
