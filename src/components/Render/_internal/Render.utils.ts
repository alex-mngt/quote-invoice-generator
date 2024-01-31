import { GlobalContextValue } from "@/contexts/GlobalContext/_internal/GlobalContext.types";
import { Task, Template } from "@/lib/types";
import { isTaskProperty } from "@/lib/utils";

import { RenderSearchParamsValues, TaskSearchParamKey } from "./Render.types";

export const getTitle = (template: string | undefined): string | undefined => {
  switch (template) {
    case "quote":
      return "Devis";
    case "invoice":
      return "Facture";
    case "deposit":
      return "Facture d'acompte";
    default:
      return;
  }
};

const parseTasksFromSearchParams = (
  searchParamsTasksObject: Record<TaskSearchParamKey, string>,
): Task[] => {
  return Object.entries(searchParamsTasksObject).reduce<Task[]>(
    (tasks, taskEntry) => {
      const [key, value] = taskEntry;

      const keyData = key.split("-");
      const index = Number(keyData[1]);
      const property = keyData[2];

      if (!isTaskProperty(property) || isNaN(index)) {
        return tasks;
      }

      const task: Task | undefined = tasks[index];

      if (task) {
        if (property === "quantity") {
          tasks[index].quantity = Number(value);
        } else {
          tasks[index][property] = value;
        }
      } else {
        tasks.push({
          name: "",
          description: "",
          quantity: undefined,
        });
      }

      return tasks;
    },
    [],
  );
};

type GetContextualValuesParams = {
  render: boolean;
  searchParamsValues: RenderSearchParamsValues;
  globalContext: GlobalContextValue | undefined;
};

type ContextualValues = {
  template: Template | undefined;
  invoiceNumber: string | undefined;
  invoiceObject: string | undefined;
  clientName: string | undefined;
  clientSIREN: string | undefined;
  clientAddress: string | undefined;
  clientZipCode: number | undefined;
  clientCity: string | undefined;
  clientCountry: string | undefined;
  clientEmail: string | undefined;
  deposit: number | undefined;
  invoiceWithDeposit: boolean | undefined;
  tasks: Task[] | undefined;
};

export const getContextualValues = (
  params: GetContextualValuesParams,
): ContextualValues => {
  const { render, searchParamsValues, globalContext } = params;

  const {
    template: contextTemplate,
    invoiceNumber: contextInvoiceNumber,
    invoiceObject: contextInvoiceObject,
    clientName: contextClientName,
    clientSIREN: contextClientSIREN,
    clientAddress: contextClientAddress,
    clientZipCode: contextClientZipCode,
    clientCity: contextClientCity,
    clientCountry: contextClientCountry,
    clientEmail: contextClientEmail,
    deposit: contextDeposit,
    invoiceWithDeposit: contextInvoiceWithDeposit,
    tasks: contextTasks,
  } = globalContext ?? {};

  const {
    template: searchParamsTemplate,
    invoiceNumber: searchParamsInvoiceNumber,
    invoiceObject: searchParamsInvoiceObject,
    clientName: searchParamsClientName,
    clientSIREN: searchParamsClientSIREN,
    clientAddress: searchParamsClientAddress,
    clientZipCodeString: searchParamsClientZipCodeString,
    clientCity: searchParamsClientCity,
    clientCountry: searchParamsClientCountry,
    clientEmail: searchParamsClientEmail,
    depositString: searchParamsDepositString,
    invoiceWithDepositString: searchParamsInvoiceWithDepositString,
    ...searchParamsTasksObject
  } = searchParamsValues;

  const searchParamsTasks = parseTasksFromSearchParams(searchParamsTasksObject);

  const searchParamsClientZipCode = Number(searchParamsClientZipCodeString);
  const searchParamsDeposit = Number(searchParamsDepositString);
  const searchParamsInvoiceWithDeposit =
    searchParamsInvoiceWithDepositString === "on";

  return {
    template: render ? searchParamsTemplate : contextTemplate,
    invoiceNumber: render ? searchParamsInvoiceNumber : contextInvoiceNumber,
    invoiceObject: render ? searchParamsInvoiceObject : contextInvoiceObject,
    clientName: render ? searchParamsClientName : contextClientName,
    clientSIREN: render ? searchParamsClientSIREN : contextClientSIREN,
    clientAddress: render ? searchParamsClientAddress : contextClientAddress,
    clientZipCode: render ? searchParamsClientZipCode : contextClientZipCode,
    clientCity: render ? searchParamsClientCity : contextClientCity,
    clientCountry: render ? searchParamsClientCountry : contextClientCountry,
    clientEmail: render ? searchParamsClientEmail : contextClientEmail,
    deposit: render ? searchParamsDeposit : contextDeposit,
    invoiceWithDeposit: render
      ? searchParamsInvoiceWithDeposit
      : contextInvoiceWithDeposit,
    tasks: render ? searchParamsTasks : contextTasks,
  };
};
