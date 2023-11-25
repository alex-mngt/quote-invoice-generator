"use server";

import { PuppeteerNode } from "puppeteer";

const puppeteer: PuppeteerNode = require("puppeteer");

export const createPDFBufferJSON = async (
  serializedSearchParams: URLSearchParams,
): Promise<{ type: "Buffer"; data: number[] }> => {
  const debug = process.env.PUPPETEER_DEBUG === "true";
  const browser = await puppeteer.launch({
    headless: debug ? false : "new",
    devtools: debug ? true : false,
  });
  const searchParams = new URLSearchParams(serializedSearchParams);

  const page = await browser.newPage();

  searchParams.append("render", "true");

  const renderUrl = `${process.env.BASE_URL}/?${searchParams.toString()}`;

  await page.goto(renderUrl);

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: { top: "2cm", right: "2cm", bottom: "2cm", left: "2cm" },
  });

  await new Promise<void>((r) =>
    setTimeout(async () => {
      await browser.close();
      r();
    }, 10000),
  );

  return pdfBuffer.toJSON();
};
