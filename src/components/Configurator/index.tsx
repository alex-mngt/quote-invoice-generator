"use client";

import { FC, useTransition } from "react";

import { clsx } from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { createPDFBufferJSON } from "@/actions/puppeteer";
import { Button } from "@/components/Button";
import { CommonProps, Task } from "@/lib/types";
import { downloadFromUrl } from "@/lib/utils";

import { BaseConfigurator } from "./BaseConfigurator";
import { ClientConfigurator } from "./ClientConfigurator";
import { TasksConfigurator } from "./TasksConfigurator";

type Props = {
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

export const Configurator: FC<Props> = (props) => {
  const {
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

  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const triggerPDFGeneration = () => {
    // TODO : improve the url logic (on tasks) to allow use of formData from native HTML form
    startTransition(async () => {
      const pdfBufferJSON = await createPDFBufferJSON(searchParams);

      // Converting the JSON representation of a Buffer to Buffer with Buffer.from is supported as it's said in NodeJS documentation : https://nodejs.org/api/buffer.html#buftojson
      // @ts-ignore
      const pdfBuffer = Buffer.from(pdfBufferJSON);

      const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);

      downloadFromUrl(pdfBlobUrl, `${invoiceNumber}.pdf`);
    });
  };

  return (
    <form
      action={triggerPDFGeneration}
      className={clsx(
        className,
        "p-8",
        "flex flex-col items-start gap-10",
        "border-l border-neutral-200 bg-neutral-50",
      )}
    >
      <BaseConfigurator
        invoiceNumber={invoiceNumber}
        invoiceObject={invoiceObject}
        template={template}
      />
      <ClientConfigurator
        clientAddress={clientAddress}
        clientCity={clientCity}
        clientCountry={clientCountry}
        clientEmail={clientEmail}
        clientName={clientName}
        clientZipCode={clientZipCode}
      />
      <TasksConfigurator tasks={tasks} />
      <Button type='submit'>
        {isPending ? "Generating PDF invoice ..." : "Download PDF invoice"}
      </Button>
      <Link href='/'>Reset</Link>
    </form>
  );
};
