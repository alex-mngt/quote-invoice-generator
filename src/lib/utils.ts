import { TEMPLATE_VALUES } from "./constants";
import { Task, Template } from "./types";

export const downloadFromUrl = (url: string, filename: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};

export const isTaskProperty = (str: string): str is keyof Task => {
  if (str !== "name" && str !== "description" && str !== "quantity") {
    return false;
  }

  return true;
};

export const isTemplate = (str: string): str is Template => {
  if (!TEMPLATE_VALUES.includes(str as Template)) {
    return false;
  }

  return true;
};

export const displayEUR = (price: number) => {
  return Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};
