import xlsx from "xlsx";
import * as path from "path";

export const getAcompanhamentos = async (req, res, next) => {
  try {
    const networkPath = path.join(
      "\\\\columbia",
      "backup",
      "gerenciais",
      "dirif",
      "dirif - sups",
      "01. supcif",
      "01. acompanhamento processual",
      "01. acompanhamento dos emails.xlsx"
    );

    const wb = xlsx.readFile(networkPath, { cellDates: true });

    const ws = wb.Sheets["Relatório Semanal"];

    const data = xlsx.utils.sheet_to_json(ws);

    const count = data.length;

    res.status(200).json({
      emails: data,
      total: count,
    });
  } catch (err) {
    next(err);
  }
};
