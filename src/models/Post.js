import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 500,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "algebra",
        "aritmetica",
        "geometria",
        "estatistica",
        "funcoes",
        "outros",
      ],
    },
    content: {
      type: String,
      required: true,
      maxlength: 600,
    },
    answers: [answerSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
