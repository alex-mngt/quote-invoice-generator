"use client";

import { ChangeEventHandler, FC, useContext } from "react";

import { clsx } from "clsx";

import { SelectInput } from "@/components/Inputs/SelectInput";
import { TextInput } from "@/components/Inputs/TextInput";
import { GlobalContext } from "@/contexts/GlobalContext";
import { isTemplate } from "@/lib/utils";

import { TEMPLATE_OPTIONS } from "./_internal/BaseConfigurator.constants";
import { updateTextInput } from "../_internal/Configurator.utils";

export const BaseConfigurator: FC = () => {
  const {
    template,
    setTemplate,
    invoiceNumber,
    setInvoiceNumber,
    invoiceObject,
    setInvoiceObject,
  } = useContext(GlobalContext) ?? {};

  const updateTemplate: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (setTemplate === undefined || !isTemplate(e.target.value)) {
      return;
    }

    setTemplate(e.target.value);
  };

  return (
    <div className={clsx("w-full", "flex flex-col gap-6")}>
      <p className={clsx("text-xl font-semibold")}>Base</p>
      <div className={clsx("flex flex-col gap-4")}>
        <div className={clsx("flex gap-4")}>
          <SelectInput
            className={clsx("basis-1/2")}
            label='Template'
            name='template'
            onChange={updateTemplate}
            options={TEMPLATE_OPTIONS}
            value={template}
          />
          <TextInput
            className={clsx("basis-1/2")}
            label='Numéro de facture'
            name='invoiceNumber'
            onChange={updateTextInput(setInvoiceNumber)}
            type='text'
            value={invoiceNumber}
          />
        </div>
        <TextInput
          label='Objet'
          name='invoiceObject'
          onChange={updateTextInput(setInvoiceObject)}
          type='text'
          value={invoiceObject}
        />
      </div>
    </div>
  );
};
