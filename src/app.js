import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: "https://numiverse.netlify.app",
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
