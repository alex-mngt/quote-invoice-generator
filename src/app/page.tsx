// TO DO : find a way to keep this Component a Server Component
"use client";

import { FC } from "react";

import { clsx } from "clsx";

import { Configurator } from "@/components/Configurator";
import { Render } from "@/components/Render";
import { getTasksFromTasksURLEncoded } from "@/lib/utils";

import { HomePageSearchParams } from "./_internal/HomePage.types";

type Props = {
  searchParams: HomePageSearchParams;
};

const Home: FC<Props> = (props) => {
  const { searchParams } = props;

  const {
    render,
    invoiceNumber,
    invoiceObject,
    depositString,
    clientName,
    clientSIREN,
    clientAddress,
    clientZipCodeString,
    clientCity,
    clientCountry,
    clientEmail,
    tasksURLEncoded,
    invoiceWithDepositString,
    template,
  } = searchParams;

  const clientZipCode =
    clientZipCodeString !== undefined ? Number(clientZipCodeString) : undefined;
  const isClientZipCodeNumber =
    clientZipCode !== undefined ? !isNaN(clientZipCode) : undefined;
  const deposit =
    depositString !== undefined ? Number(depositString) : undefined;
  const isDepositNumber = deposit !== undefined ? !isNaN(deposit) : undefined;
  const invoiceWithDeposit =
    invoiceWithDepositString !== undefined
      ? invoiceWithDepositString === "true"
      : undefined;

  const areSearchParamsValid =
    (isClientZipCodeNumber && isDepositNumber) || true;

  const tasks =
    tasksURLEncoded !== undefined
      ? getTasksFromTasksURLEncoded(tasksURLEncoded)
      : undefined;

  return areSearchParamsValid ? (
    render === "true" ? (
      <Render
        clientAddress={clientAddress}
        clientCity={clientCity}
        clientCountry={clientCountry}
        clientEmail={clientEmail}
        clientName={clientName}
        clientSIREN={clientSIREN}
        clientZipCode={clientZipCode}
        deposit={deposit}
        invoiceNumber={invoiceNumber}
        invoiceObject={invoiceObject}
        invoiceWithDeposit={invoiceWithDeposit}
        render={render === "true"}
        tasks={tasks}
        template={template}
      />
    ) : (
      <div className={clsx("h-screen overflow-hidden", "flex")}>
        <Render
          className={clsx("overflow-y-scroll")}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientCountry={clientCountry}
          clientEmail={clientEmail}
          clientName={clientName}
          clientSIREN={clientSIREN}
          clientZipCode={clientZipCode}
          deposit={deposit}
          invoiceNumber={invoiceNumber}
          invoiceObject={invoiceObject}
          invoiceWithDeposit={invoiceWithDeposit}
          render={render === "true"}
          tasks={tasks}
          template={template}
        />
        <Configurator
          className={clsx("flex-1", "overflow-y-scroll")}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientCountry={clientCountry}
          clientEmail={clientEmail}
          clientName={clientName}
          clientSIREN={clientSIREN}
          clientZipCode={clientZipCode}
          deposit={deposit}
          invoiceNumber={invoiceNumber}
          invoiceObject={invoiceObject}
          invoiceWithDeposit={invoiceWithDeposit}
          tasks={tasks}
          template={template}
        />
      </div>
    )
  ) : (
    <p>invalid search params</p>
  );
};

export default Home;
