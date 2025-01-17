import * as dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron";
import mongoose from "mongoose";

import acompanhamentoRoute from "./routes/acompanhamentoRouter.js";
import emailsRoute from "./routes/emailsRouter.js";
import reportsRoute from "./routes/reportsRouter.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";
import { enviarEmail } from "./utils/enviarEmail.js";
import { automacao } from "./utils/automacao.js";
import { generateMonthlyReport } from "./utils/generateMonthlyReport.js";

dotenv.config();

const PORT = process.env.PORT || 8800;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/acompanhamento/", acompanhamentoRoute);
app.use("/api/emails/", emailsRoute);
app.use("/api/reports/", reportsRoute);

app.use(errorHandler);

cron.schedule("00 19 * * 5", () => {
  automacao();
  enviarEmail();
});

cron.schedule("30 19 28-31 * *", async () => {
  try {
    const today = new Date();
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();

    if (today.getDate() === lastDayOfMonth) {
      console.log("Gerando relatório mensal...");
      await generateMonthlyReport();
    } else {
      console.log("Hoje não é o último dia do mês.");
    }
  } catch (err) {
    console.error("Erro ao gerar relatório mensal: ", err);
  }
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
