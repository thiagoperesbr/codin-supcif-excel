import xlsx from "xlsx";
import * as path from "path";

export const getAcompanhamentos = async (req, res, next) => {
  try {
    const networkPath = path.join(
      "D:",
      "www",
      "codin-supcif-excel",
      "backend",
      "src",
      "excel",
      "01. acompanhamento dos emails.xlsx"
    );

    const wb = xlsx.readFile(networkPath, { cellDates: true });

    const ws = wb.Sheets["Relatório Semanal"];

    const data = xlsx.utils.sheet_to_json(ws);

    res.status(200).json({
      emails: data,
    });
  } catch (err) {
    next(err);
  }
};
