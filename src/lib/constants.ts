import { PDFMargin } from "puppeteer";

export const PDF_MARGINS: PDFMargin = {
  top: "2cm",
  right: "2cm",
  bottom: "2cm",
  left: "2cm",
};

export const TEMPLATE_VALUES = ["invoice", "quote", "deposit"] as const;
