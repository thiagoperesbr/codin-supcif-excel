import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron";

import acompanhamentoRoute from "./routes/acompanhamentoRouter.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";
import { enviarEmail } from "./utils/enviarEmail.js";

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

app.use(errorHandler);

cron.schedule("0 10 * * 5", () => {
  enviarEmail();
});

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
