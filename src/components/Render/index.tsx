"use client";

import { FC, useContext } from "react";

import { clsx } from "clsx";
import { DateTime } from "luxon";

import { WeAreStudio99 } from "@/components/icons/WeAreStudio99";
import { GlobalContext } from "@/contexts/GlobalContext";
import { PDF_MARGINS } from "@/lib/constants";
import { CommonProps } from "@/lib/types";

import { RenderSearchParamsValues } from "./_internal/Render.types";
import { getContextualValues, getTitle } from "./_internal/Render.utils";
import { RenderDetails } from "./RenderDetails";
import { RenderLegal } from "./RenderLegal";
import { RenderParties } from "./RenderParties";
import { RenderPayment } from "./RenderPayment";
import { RenderTasksTable } from "./RenderTasksTable";

type Props = {
  render: boolean;
  searchParamsValues: RenderSearchParamsValues;
} & CommonProps;

export const Render: FC<Props> = (props) => {
  const { className, render, searchParamsValues } = props;

  const globalContext = useContext(GlobalContext);

  const {
    template,
    invoiceNumber,
    invoiceObject,
    clientName,
    clientSIREN,
    clientAddress,
    clientZipCode,
    clientCity,
    clientCountry,
    clientEmail,
    deposit,
    invoiceWithDeposit,
    tasks,
  } = getContextualValues({
    render,
    searchParamsValues,
    globalContext,
  });

  const today = DateTime.now();

  return (
    <main
      className={clsx(className, !render && `w-[21cm]`, "no-scrollbar")}
      style={{
        padding: render
          ? 0
          : `${PDF_MARGINS.top} ${PDF_MARGINS.right} ${PDF_MARGINS.bottom} ${PDF_MARGINS.left}`,
      }}
    >
      <div className={clsx("flex justify-between", "mb-8")}>
        <h1 className={clsx("text-3xl font-semibold")}>{getTitle(template)}</h1>
        <WeAreStudio99 className='w-12' />
      </div>
      <RenderDetails
        className='mb-8'
        invoiceNumber={invoiceNumber}
        template={template}
        today={today}
      />
      <RenderParties
        className='mb-8'
        clientAddress={clientAddress}
        clientCity={clientCity}
        clientCountry={clientCountry}
        clientEmail={clientEmail}
        clientName={clientName}
        clientSIREN={clientSIREN}
        clientZipCode={clientZipCode}
      />
      <RenderTasksTable
        className='mb-8'
        deposit={deposit}
        invoiceObject={invoiceObject}
        invoiceWithDeposit={invoiceWithDeposit}
        tasks={tasks}
        template={template}
      />
      <RenderPayment
        className={clsx("mb-9")}
        template={template}
        today={today}
      />
      <RenderLegal />
    </main>
  );
};
