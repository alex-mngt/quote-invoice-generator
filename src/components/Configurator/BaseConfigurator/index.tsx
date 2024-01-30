"use client";

import { FC, useEffect } from "react";

import { clsx } from "clsx";
import { useRouter } from "next/navigation";

import { SelectInput } from "@/components/Inputs/SelectInput";
import { TextInput } from "@/components/Inputs/TextInput";

import { TEMPLATE_OPTIONS } from "./_internal/BaseConfigurator.constants";
import { getSelectedTemplateIndex } from "./_internal/BaseConfigurator.utils";
import { getTextInputNameSearchParamsUpdater } from "../_internal/Configurator.utils";

type Props = {
  invoiceNumber: string | undefined;
  invoiceObject: string | undefined;
  template: string | undefined;
};

export const BaseConfigurator: FC<Props> = (props) => {
  const { invoiceNumber, invoiceObject, template } = props;
  const router = useRouter();

  const selectedTemplateIndex = getSelectedTemplateIndex(template);

  const updateTemplateSearchParams = (newSelectedIdx: number) => {
    if (window === undefined) {
      return;
    }

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    searchParams.set("template", TEMPLATE_OPTIONS[newSelectedIdx].value);

    router.replace(url.href);
  };

  const updateTextInputNameSearchParams =
    getTextInputNameSearchParamsUpdater(router);

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    searchParams.set("template", TEMPLATE_OPTIONS[selectedTemplateIndex].value);

    router.replace(url.href);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx("w-full", "flex flex-col gap-6")}>
      <p className={clsx("text-xl font-semibold")}>Base</p>
      <div className={clsx("flex flex-col gap-4")}>
        <div className={clsx("flex gap-4")}>
          <SelectInput
            className={clsx("basis-1/2")}
            label='Template'
            name='template'
            onChange={updateTemplateSearchParams}
            options={TEMPLATE_OPTIONS}
            selectedIndex={selectedTemplateIndex}
          />
          <TextInput
            className={clsx("basis-1/2")}
            label='Numéro de facture'
            name='invoiceNumber'
            onChange={updateTextInputNameSearchParams}
            type='text'
            value={invoiceNumber}
          />
        </div>
        <TextInput
          label='Objet'
          name='invoiceObject'
          onChange={updateTextInputNameSearchParams}
          type='text'
          value={invoiceObject}
        />
      </div>
    </div>
  );
};
