import { FC } from "react";

import { clsx } from "clsx";
import { DateTime } from "luxon";

import { CommonProps, Task } from "@/lib/types";

import { RenderBaseLayout } from "./RenderBaseLayout";
import { RenderDetails } from "./RenderDetails";
import { RenderLegal } from "./RenderLegal";
import { RenderParties } from "./RenderParties";
import { RenderPayment } from "./RenderPayment";
import { RenderTasks } from "./RenderTasks";

type Props = {
  render: boolean;
  template: string | undefined;
  invoiceNumber: string | undefined;
  invoiceObject: string | undefined;
  clientName: string | undefined;
  clientAddress: string | undefined;
  clientZipCode: number | undefined;
  clientCity: string | undefined;
  clientCountry: string | undefined;
  clientEmail: string | undefined;
  tasks: Task[] | undefined;
} & CommonProps;

export const Render: FC<Props> = (props) => {
  const {
    render,
    template,
    className,
    invoiceNumber,
    invoiceObject,
    clientName,
    clientAddress,
    clientZipCode,
    clientCity,
    clientCountry,
    clientEmail,
    tasks,
  } = props;

  const today = DateTime.now();

  const ADR = Number(process.env.NEXT_PUBLIC_COMPANY_ADR);

  const isADRNumber = !isNaN(ADR);

  return isADRNumber ? (
    <RenderBaseLayout className={className} render={render} template={template}>
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
        clientZipCode={clientZipCode}
      />
      <RenderTasks
        ADR={ADR}
        className='mb-8'
        invoiceObject={invoiceObject}
        tasks={tasks}
      />
      <RenderPayment
        className={clsx("mb-9")}
        template={template}
        today={today}
      />
      <RenderLegal />
    </RenderBaseLayout>
  ) : (
    <p>invalid ADR</p>
  );
};
