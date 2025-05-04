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

app.use(errorHandler);

export default app;
