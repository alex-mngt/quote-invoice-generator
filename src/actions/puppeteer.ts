"use server";

import { PuppeteerNode } from "puppeteer";

const puppeteer: PuppeteerNode = require("puppeteer");

export const createPDFBufferJSON = async (
  formData: FormData,
): Promise<{ type: "Buffer"; data: number[] }> => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const searchParams = new URLSearchParams();

  formData.forEach((value, key) => {
    searchParams.append(key, value.toString());
  });

  const renderUrl = `${process.env.BASE_URL}/render?${searchParams.toString()}`;

  await page.goto(renderUrl);

  const pdfBuffer = await page.pdf({ format: "A4" });

  return pdfBuffer.toJSON();
};
