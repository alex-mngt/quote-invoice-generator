import { FC } from "react";

import { clsx } from "clsx";
import { DateTime } from "luxon";

import { PDF_MARGINS } from "@/lib/constants";
import { CommonProps, Task } from "@/lib/types";

import { getTitle } from "./_internal/Render.utils";
import { RenderDetails } from "./RenderDetails";
import { RenderLegal } from "./RenderLegal";
import { RenderParties } from "./RenderParties";
import { RenderPayment } from "./RenderPayment";
import { RenderTasksTable } from "./RenderTasksTable";
import { WeAreStudio99 } from "../icons/WeAreStudio99";

type Props = {
  render: boolean;
  template: string | undefined;
  invoiceNumber: string | undefined;
  invoiceObject: string | undefined;
  deposit: number | undefined;
  clientName: string | undefined;
  clientSIREN: string | undefined;
  clientAddress: string | undefined;
  clientZipCode: number | undefined;
  clientCity: string | undefined;
  clientCountry: string | undefined;
  clientEmail: string | undefined;
  tasks: Task[] | undefined;
  invoiceWithDeposit: boolean | undefined;
} & CommonProps;

export const Render: FC<Props> = (props) => {
  const {
    render,
    template,
    className,
    invoiceNumber,
    invoiceObject,
    deposit,
    clientName,
    clientSIREN,
    clientAddress,
    clientZipCode,
    clientCity,
    clientCountry,
    clientEmail,
    tasks,
    invoiceWithDeposit,
  } = props;

  const today = DateTime.now();

  const ADR = Number(process.env.NEXT_PUBLIC_COMPANY_ADR);

  const isADRNumber = !isNaN(ADR);

  return isADRNumber ? (
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
        ADR={ADR}
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
  ) : (
    <p>invalid ADR</p>
  );
};
