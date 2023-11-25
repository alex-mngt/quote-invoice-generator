// TO DO : find a way to keep this Component a Server Component
"use client";

import { FC } from "react";

import { clsx } from "clsx";

import { Configurator } from "@/components/Configurator";
import { Invoice } from "@/components/Invoice";
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
    clientName,
    clientAddress,
    clientZipCodeString,
    clientCity,
    clientCountry,
    clientEmail,
    tasksURLEncoded,
  } = searchParams;

  const clientZipCode =
    clientZipCodeString !== undefined ? Number(clientZipCodeString) : undefined;
  const isClientZipCodeNumber =
    clientZipCode !== undefined ? !isNaN(clientZipCode) : undefined;

  const areSearchParamsValid = isClientZipCodeNumber || true;

  const tasks =
    tasksURLEncoded !== undefined
      ? getTasksFromTasksURLEncoded(tasksURLEncoded)
      : undefined;

  return areSearchParamsValid ? (
    render === "true" ? (
      <Invoice
        clientAddress={clientAddress}
        clientCity={clientCity}
        clientCountry={clientCountry}
        clientEmail={clientEmail}
        clientName={clientName}
        clientZipCode={clientZipCode}
        invoiceNumber={invoiceNumber}
        invoiceObject={invoiceObject}
        render={render === "true"}
        tasks={tasks}
      />
    ) : (
      <div className={clsx("h-screen overflow-hidden", "flex")}>
        <Invoice
          className={clsx("overflow-y-scroll")}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientCountry={clientCountry}
          clientEmail={clientEmail}
          clientName={clientName}
          clientZipCode={clientZipCode}
          invoiceNumber={invoiceNumber}
          invoiceObject={invoiceObject}
          render={render === "true"}
          tasks={tasks}
        />
        <Configurator
          className={clsx("flex-1", "overflow-y-scroll")}
          clientAddress={clientAddress}
          clientCity={clientCity}
          clientCountry={clientCountry}
          clientEmail={clientEmail}
          clientName={clientName}
          clientZipCode={clientZipCode}
          invoiceNumber={invoiceNumber}
          invoiceObject={invoiceObject}
          tasks={tasks}
        />
      </div>
    )
  ) : (
    <p>invalid search params</p>
  );
};

export default Home;
