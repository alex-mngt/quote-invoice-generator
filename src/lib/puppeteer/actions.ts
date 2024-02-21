"use server";

import { PuppeteerNode } from "puppeteer";

import { PDF_MARGINS } from "@/lib/constants";

const chromium = require("@sparticuz/chromium");
const puppeteer: PuppeteerNode = require("puppeteer");

export const createPDFBufferJSON = async (
  formData: FormData,
): Promise<{ type: "Buffer"; data: number[] }> => {
  const debug = process.env.PUPPETEER_DEBUG === "true";

  const browser = await puppeteer.launch({
    devtools: debug ? true : false,
    headless: debug ? false : chromium.headless,
    args: debug ? undefined : chromium.args,
    defaultViewport: debug ? undefined : chromium.defaultViewport,
    executablePath: debug ? undefined : await chromium.executablePath(),
  });

  const page = await browser.newPage();

  const searchParams = new URLSearchParams(formData as any);
  searchParams.append("render", "true");

  await page.goto(`${process.env.BASE_URL}/?${searchParams.toString()}`);

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: PDF_MARGINS,
  });

  await browser.close();

  return pdfBuffer.toJSON();
};
