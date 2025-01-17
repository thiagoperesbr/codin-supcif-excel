import Emails from "../models/Emails.js";
import dayjs from "dayjs";
import fs from "fs";
import path from "path";

export const getReportsByYear = async (req, res, next) => {
  try {
    const baseDir = "/var/www/supcif-excel/backend/uploads/reports";
    const { year } = req.params;
    const yearPath = path.join(baseDir, year);

    if (!fs.existsSync(yearPath)) {
      return res.status(404).json({
        message: "Nenhum relatório encontrado para o ano solicitado.",
      });
    }

    console.log(yearPath);

    const files = fs.readdirSync(yearPath);

    console.log(files);

    const reports = files.map((file) => {
      const baseName = path.basename(file, path.extname(file));
      const month = baseName.split("-")[0];

      return {
        month,
        name: file,
      };
    });
    return res.json(reports);
  } catch (err) {
    next(err);
  }
};
