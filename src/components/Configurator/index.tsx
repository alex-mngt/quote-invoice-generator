"use client";

import { FC, useContext, useTransition } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import { Button } from "@/components/Button";
import { GlobalContext } from "@/contexts/GlobalContext";
import { createPDFBufferJSON } from "@/lib/puppeteer/actions";
import { CommonProps } from "@/lib/types";
import { downloadFromUrl } from "@/lib/utils";

import { BaseConfigurator } from "./BaseConfigurator";
import { ClientConfigurator } from "./ClientConfigurator";
import { OptionsConfigurator } from "./OptionsConfigurator";
import { TasksConfigurator } from "./TasksConfigurator";

type Props = {} & CommonProps;

export const Configurator: FC<Props> = (props) => {
  const { className } = props;

  const { template, invoiceNumber } = useContext(GlobalContext) ?? {};
  const [isPending, startTransition] = useTransition();

  const triggerPDFGeneration = (formData: FormData) => {
    startTransition(async () => {
      const pdfBufferJSON = await createPDFBufferJSON(formData);

      // Converting the JSON representation of a Buffer to Buffer with Buffer.from is supported as it's said in NodeJS documentation : https://nodejs.org/api/buffer.html#buftojson
      // @ts-expect-error
      const pdfBuffer = Buffer.from(pdfBufferJSON);
      const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);

      downloadFromUrl(pdfBlobUrl, `${invoiceNumber}.pdf`);
    });
  };

  const isDeposit = template === "deposit";
  const isQuote = template === "quote";

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
      <BaseConfigurator />
      <ClientConfigurator />
      {!isQuote && <OptionsConfigurator />}
      {!isDeposit && <TasksConfigurator />}
      <Button type='submit'>
        {isPending ? "Generating PDF invoice ..." : "Download PDF invoice"}
      </Button>
      <Link href='/'>Reset</Link>
    </form>
  );
};
