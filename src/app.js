import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.use("/api/user", userRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
