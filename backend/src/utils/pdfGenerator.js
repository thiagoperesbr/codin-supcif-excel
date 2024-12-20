import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import fs from "fs";
import path from "path";

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 18, marginBottom: 10, textAlign: "center" },
  content: { fontSize: 12, marginBottom: 5 },
});

const generatePDFContent = (reportContent) => {
  Document({
    children: [
      Page({
        size: "A4",
        style: styles.page,
        children: [
          Text({ style: styles.title, children: "Relatório Mensal" }),
          Text({ styke: styles.content, children: reportContent }),
        ],
      }),
    ],
  });
};

export const savePDF = async (reportContent, year, month) => {
  const baseDir = "/var/www/supcif-excel/backend/uploads/reports";

  const outputPath = path.join(baseDir, `${year}`);

  fs.mkdirSync(outputPath, { recursive: true });

  const filePath = path.join(outputPath, `${month}-relatorio-mensal.pdf`);

  const pdfStream = await ReactPDF.renderToStream(
    generatePDFContent(reportContent)
  );

  const writeStream = fs.createWriteStream(filePath);

  pdfStream.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
};
