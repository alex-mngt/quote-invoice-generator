"use client";

import { FC, PropsWithChildren, createContext, useState } from "react";

import { Task, Template } from "@/lib/types";

import { GlobalContextValue } from "./_internal/GlobalContext.types";

export const GlobalContext = createContext<GlobalContextValue | undefined>(
  undefined,
);

export const GlobalContextProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [template, setTemplate] = useState<Template>("quote");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceObject, setInvoiceObject] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientSIREN, setClientSIREN] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientZipCode, setClientZipCode] = useState<number>();
  const [clientCity, setClientCity] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [invoiceWithDeposit, setInvoiceWithDeposit] = useState(false);
  const [deposit, setDeposit] = useState<number>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const contextValue: GlobalContextValue = {
    template,
    setTemplate,
    invoiceNumber,
    setInvoiceNumber,
    invoiceObject,
    setInvoiceObject,
    clientName,
    setClientName,
    clientSIREN,
    setClientSIREN,
    clientAddress,
    setClientAddress,
    clientZipCode,
    setClientZipCode,
    clientCity,
    setClientCity,
    clientCountry,
    setClientCountry,
    clientEmail,
    setClientEmail,
    invoiceWithDeposit,
    setInvoiceWithDeposit,
    deposit,
    setDeposit,
    tasks,
    setTasks,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
