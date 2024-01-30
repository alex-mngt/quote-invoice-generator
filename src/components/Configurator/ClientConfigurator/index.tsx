import { FC } from "react";

import { clsx } from "clsx";
import { useRouter } from "next/navigation";

import { TextInput } from "@/components/Inputs/TextInput";

import { getTextInputNameSearchParamsUpdater } from "../_internal/Configurator.utils";

type Props = {
  clientName: string | undefined;
  clientSIREN: string | undefined;
  clientAddress: string | undefined;
  clientZipCode: number | undefined;
  clientCity: string | undefined;
  clientCountry: string | undefined;
  clientEmail: string | undefined;
};

export const ClientConfigurator: FC<Props> = (props) => {
  const {
    clientName,
    clientSIREN,
    clientAddress,
    clientZipCode,
    clientCity,
    clientCountry,
    clientEmail,
  } = props;

  const router = useRouter();

  const updateTextInputNameSearchParams =
    getTextInputNameSearchParamsUpdater(router);

  return (
    <div className={clsx("w-full", "flex flex-col gap-6")}>
      <p className={clsx("text-xl font-semibold")}>Client</p>
      <div className={clsx("flex flex-col gap-4")}>
        <TextInput
          label='Nom'
          name='clientName'
          onChange={updateTextInputNameSearchParams}
          type='text'
          value={clientName}
        />
        <div className={clsx("flex gap-4", "w-full")}>
          <TextInput
            className={clsx("basis-full")}
            label='SIREN'
            name='clientSIREN'
            onChange={updateTextInputNameSearchParams}
            type='text'
            value={clientSIREN}
          />
        </div>
        <div className={clsx("flex gap-4", "w-full")}>
          <TextInput
            className={clsx("basis-full")}
            label='Adresse'
            name='clientAddress'
            onChange={updateTextInputNameSearchParams}
            type='text'
            value={clientAddress}
          />
        </div>
        <div className={clsx("flex gap-4", "w-full")}>
          <TextInput
            className={clsx("basis-2/12")}
            label='Code postal'
            name='clientZipCodeString'
            onChange={updateTextInputNameSearchParams}
            type='number'
            value={clientZipCode}
          />
          <TextInput
            className={clsx("basis-5/12")}
            label='Ville'
            name='clientCity'
            onChange={updateTextInputNameSearchParams}
            type='text'
            value={clientCity}
          />
          <TextInput
            className={clsx("basis-5/12")}
            label='Pays'
            name='clientCountry'
            onChange={updateTextInputNameSearchParams}
            type='text'
            value={clientCountry}
          />
        </div>
        <TextInput
          label='Email'
          name='clientEmail'
          onChange={updateTextInputNameSearchParams}
          type='text'
          value={clientEmail}
        />
      </div>
    </div>
  );
};
