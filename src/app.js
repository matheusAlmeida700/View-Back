import express from "express";
import cors from "cors";
import morgan from "morgan";
import studentRoutes from "./routes/studentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import essayRoutes from "./routes/essayRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.use("/api/student", studentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/essay", essayRoutes);
app.use("/api/grade", gradeRoutes);

app.get("/ai", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8008/");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error calling AI (GET /):", error);
    res.status(500).json({ error: "Error accessing AI service" });
  }
});

app.post("/ai/analyze/text", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8008/api/analyze/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error calling AI (POST /analyze/text):", error);
    res.status(500).json({ error: "Error accessing AI service" });
  }
});

app.use(errorHandler);

export default app;
