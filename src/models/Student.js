import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    class: { type: String, required: true },
    number: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);
