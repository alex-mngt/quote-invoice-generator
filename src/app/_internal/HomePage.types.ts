import { Template } from "@/lib/types";

export type HomePageSearchParams = {
  render?: string;
  template?: Template;
  invoiceNumber?: string;
  invoiceObject?: string;
  depositString?: string;
  clientName?: string;
  clientSIREN?: string;
  clientAddress?: string;
  clientZipCodeString?: string;
  clientCity?: string;
  clientCountry?: string;
  clientEmail?: string;
  tasksURLEncoded?: string;
  invoiceWithDepositString?: string;
};
