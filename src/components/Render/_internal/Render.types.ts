import { Template } from "@/lib/types";

export type TaskSearchParamKey =
  | `task-${number}-name`
  | `task-${number}-description`
  | `task-${number}-quantity`;

export type RenderSearchParamsValues = {
  template?: Template;
  invoiceNumber?: string;
  invoiceObject?: string;
  clientName?: string;
  clientSIREN?: string;
  clientAddress?: string;
  clientZipCodeString?: string;
  clientCity?: string;
  clientCountry?: string;
  clientEmail?: string;
  depositString?: string;
  invoiceWithDepositString?: string;
} & Record<TaskSearchParamKey, string>;
