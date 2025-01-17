//import PDFDocument from "pdfkit";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export const savePDF = async (reportContent, year, month) => {
  const baseDir = "/var/www/supcif-excel/backend/uploads/reports";
  // const baseDir = path.join(
  //   "C:",
  //   "www",
  //   "codin-supcif-excel",
  //   "backend",
  //   "uploads",
  //   "reports"
  // );

  const outputPath = path.join(baseDir, `${year}`);

  const filePath = path.join(outputPath, `${month}-relatorio-mensal.pdf`);

  fs.mkdirSync(outputPath, { recursive: true });

  const generateHTML = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Relatório Mensal - ${month}/${year}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          line-height: 1.6;
          color: #333;
        }
        h1 {
          text-align: center;
          color: #2c3e50;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 10ox;
        }
        p {
          margin: 10px 0;
        }
        .section {
          margin-bottom: 30px;
        }
        ul {
          margin: 0;
          padding-left: 20px;
        }
        li {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <h1>Relatório Mensal - ${month}/${year}</h1>
      <div class="section">
        <p>${reportContent.replace(/\n/g, "<br>")}</p>
      </div>
    </body>
  `;

  try {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-extensions",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    await page.setContent(generateHTML, { waitUntil: "load" });

    await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "30px",
        right: "30px",
      },
    });

    await browser.close();
    return filePath;
  } catch (err) {
    throw new Error(err);
  }

  /* return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 30,
      });

      const writeStream = fs.createWriteStream(filePath);

      doc.pipe(writeStream);

      doc
        .fontSize(18)
        .text(`Relatório Mensal - ${month}/${year}`, {
          align: "center",
          bold: true,
        })
        .moveDown(2);

      doc.fontSize(12).text(reportContent, {
        align: "justify",
      });

      doc.end();

      writeStream.on("finish", () => {
        resolve(filePath);
      });

      writeStream.on("error", (err) => {
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  }); */
};
