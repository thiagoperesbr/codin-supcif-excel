import * as dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron";
import mongoose from "mongoose";

import acompanhamentoRoute from "./routes/acompanhamentoRouter.js";
import emailsRoute from "./routes/emailsRouter.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";
import { enviarEmail } from "./utils/enviarEmail.js";

dotenv.config();

const PORT = process.env.PORT || 8800;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/acompanhamento/", acompanhamentoRoute);
app.use("/api/emails/", emailsRoute);

app.use(errorHandler);

cron.schedule("0 10 * * 5", () => {
  enviarEmail();
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} - MongoDB connected.`);
    });
  })
  .catch((err) => console.log(err));

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected.");
});
