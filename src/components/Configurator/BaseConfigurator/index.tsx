"use client";

import { FC, useEffect } from "react";

import { clsx } from "clsx";
import { useRouter } from "next/navigation";

import { SelectInput } from "@/components/Inputs/SelectInput";
import { TextInput } from "@/components/Inputs/TextInput";

import { TEMPLATE_OPTIONS } from "./_internal/BaseConfigurator.constants";
import { getSelectedTemplateIndex } from "./_internal/BaseConfigurator.utils";
import { updateTextInputNameSearchParams } from "../_internal/Configurator.utils";

type Props = {
  invoiceNumber: string | undefined;
  invoiceObject: string | undefined;
  template: string | undefined;
};

export const BaseConfigurator: FC<Props> = (props) => {
  const { invoiceNumber, invoiceObject, template } = props;
  const router = useRouter();

  const selectedTemplateIndex = getSelectedTemplateIndex(template);

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    searchParams.set("template", TEMPLATE_OPTIONS[selectedTemplateIndex].value);

    router.replace(url.href);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTemplateSearchParams = (newSelectedIdx: number) => {
    if (window === undefined) {
      return;
    }

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    searchParams.set("template", TEMPLATE_OPTIONS[newSelectedIdx].value);

    router.replace(url.href);
  };

  return (
    <div className={clsx("w-full", "flex flex-col gap-6")}>
      <p className={clsx("text-xl font-semibold")}>Base</p>
      <div className={clsx("flex flex-col gap-4")}>
        <SelectInput
          className={clsx("w-1/2")}
          label='Template'
          name='template'
          onChange={updateTemplateSearchParams}
          options={TEMPLATE_OPTIONS}
          selectedIndex={selectedTemplateIndex}
        />
        <div className={clsx("flex justify-start gap-4", "w-full")}>
          <TextInput
            className='animation-fadeIn basis-1/2'
            label='Numéro de facture'
            name='invoiceNumber'
            onChange={updateTextInputNameSearchParams(router)}
            type='text'
            value={invoiceNumber}
          />
          <TextInput
            className='animation-fadeIn basis-1/2'
            label='Objet'
            name='invoiceObject'
            onChange={updateTextInputNameSearchParams(router)}
            type='text'
            value={invoiceObject}
          />
        </div>
      </div>
    </div>
  );
};
