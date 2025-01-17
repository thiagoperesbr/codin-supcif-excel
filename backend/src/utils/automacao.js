import puppeteer from "puppeteer";

export const automacao = async () => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath:
        "/usr/bin/google-chrome-stable",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-extensions",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    await page.goto("http://supcif-excel.codin.gov", {
      waitUntil: "domcontentloaded",
    });

    await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 1000));

    console.log("Processo de automação concluído.");
  } catch (err) {
    console.error("Erro durante a automação:", err);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
