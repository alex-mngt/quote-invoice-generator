"use client";

import { FC } from "react";

import { clsx } from "clsx";
import { useRouter } from "next/navigation";

import { TextInput } from "@/components/Inputs/TextInput";

import { updateInputNameSearchParams } from "../_internal/Configurator.utils";

type Props = {
  invoiceNumber: string | undefined;
  invoiceObject: string | undefined;
};

export const BaseConfigurator: FC<Props> = (props) => {
  const { invoiceNumber, invoiceObject } = props;
  const router = useRouter();

  return (
    <div className={clsx("w-full", "flex flex-col gap-6")}>
      <p className={clsx("text-xl font-semibold")}>Base</p>
      <div className={clsx("flex flex-col gap-4")}>
        <div className={clsx("flex justify-start gap-4", "w-full")}>
          <TextInput
            className='animation-fadeIn basis-1/2'
            label='Numéro de facture'
            name='invoiceNumber'
            onChange={updateInputNameSearchParams(router)}
            type='text'
            value={invoiceNumber}
          />
          <TextInput
            className='animation-fadeIn basis-1/2'
            label='Objet'
            name='invoiceObject'
            onChange={updateInputNameSearchParams(router)}
            type='text'
            value={invoiceObject}
          />
        </div>
      </div>
    </div>
  );
};
