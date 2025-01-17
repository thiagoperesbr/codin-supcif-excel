import * as xlsx from "xlsx";
import SMB2 from "smb2";
import fs from "fs";
import path from "path";

export const getAcompanhamentos = async (req, res, next) => {
  try {
    const smbClient = new SMB2({
      share: "\\\\10.12.5.51\\backup",
      domain: "codin.gov",
      username: "tperes",
      password: "Deinf00",
    });

    const filePathWindows =
      "gerenciais\\dirif\\dirif - sups\\01. supcif\\01. acompanhamento processual\\01. acompanhamento dos emails.xlsx";

    const linuxDirectory = "/var/www/supcif-excel/backend/excel/";
    const filePathLinux = path.join(
      linuxDirectory,
      "acompanhamento dos emails.xlsx"
    );

    if (!fs.existsSync(linuxDirectory)) {
      fs.mkdirSync(linuxDirectory, { recursive: true });
    }

    smbClient.readFile(filePathWindows, (err, fileBuffer) => {
      if (err) {
        console.error("Erro ao acessar o arquivo SMB:", err);
        return next(err);
      }

      fs.writeFile(filePathLinux, fileBuffer, (writeErr) => {
        if (writeErr) {
          console.error(
            "Erro ao salvar o arquivo no servidor Linux:",
            writeErr
          );
          return next(writeErr);
        }

        try {
          const wb = xlsx.read(fileBuffer, { type: "buffer", cellDates: true });
          const ws = wb.Sheets["Relatório Semanal"];

          if (!ws) {
            throw new Error(
              "A aba 'Relatório Semanal' não foi encontrada no arquivo."
            );
          }

          const data = xlsx.utils.sheet_to_json(ws);

          res.status(200).json({ emails: data });
        } catch (excelErr) {
          console.error("Erro ao processar o arquivo Excel:", excelErr);
          next(excelErr);
        }
      });
    });
  } catch (err) {
    console.error("Erro geral:", err);
    next(err);
  }
};
