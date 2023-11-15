"use client";

import { FC, useTransition } from "react";

import clsx from "clsx";

import { createPDFBufferJSON } from "@/actions/puppeteer";
import { Button } from "@/components/Button";
import { downloadFromUrl } from "@/lib/utils";

import { TextInput } from "../TextInput";

export const PDFForm: FC = () => {
  const [isPending, startTransition] = useTransition();

  const triggerPDFGeneration = (formData: FormData) => {
    startTransition(async () => {
      const pdfBufferJSON = await createPDFBufferJSON(formData);

      // Converting the JSON representation of a Buffer to Buffer with Buffer.from is supported as it's said in NodeJS documentation : https://nodejs.org/api/buffer.html#buftojson
      // @ts-ignore
      const pdfBuffer = Buffer.from(pdfBufferJSON);

      const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);

      downloadFromUrl(pdfBlobUrl, `invoice-${Date.now()}.pdf`);
    });
  };

  return (
    <form
      action={triggerPDFGeneration}
      className={clsx("flex flex-col items-start gap-8")}
    >
      <div className={clsx("flex flex-col gap-4")}>
        <TextInput label='Numero de facture' name='invoiceNumber' />
        <TextInput label='Company name' name='companyName' />
      </div>
      <Button type='submit'>
        {isPending ? "Generating PDF invoice ..." : "Download PDF invoice"}
      </Button>
    </form>
  );
};
