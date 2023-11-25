import { FC } from "react";

import { clsx } from "clsx";
import { useRouter } from "next/navigation";

import { TextInput } from "@/components/Inputs/TextInput";

import { updateTextInputNameSearchParams } from "../_internal/Configurator.utils";

type Props = {
  clientName: string | undefined;
  clientAddress: string | undefined;
  clientZipCode: number | undefined;
  clientCity: string | undefined;
  clientCountry: string | undefined;
  clientEmail: string | undefined;
};

export const ClientConfigurator: FC<Props> = (props) => {
  const {
    clientName,
    clientAddress,
    clientZipCode,
    clientCity,
    clientCountry,
    clientEmail,
  } = props;
  const router = useRouter();

  return (
    <div className={clsx("w-full", "flex flex-col gap-6")}>
      <p className={clsx("text-xl font-semibold")}>Client</p>
      <div className={clsx("flex flex-col gap-4")}>
        <div className={clsx("flex gap-4", "w-full")}>
          <TextInput
            className={clsx("basis-1/2")}
            label='Nom'
            name='clientName'
            onChange={updateTextInputNameSearchParams(router)}
            type='text'
            value={clientName}
          />
          <TextInput
            className={clsx("basis-1/2")}
            label='Email'
            name='clientEmail'
            onChange={updateTextInputNameSearchParams(router)}
            type='text'
            value={clientEmail}
          />
        </div>
        <div className={clsx("flex gap-4", "w-full")}>
          <TextInput
            className={clsx("basis-full")}
            label='Adresse'
            name='clientAddress'
            onChange={updateTextInputNameSearchParams(router)}
            type='text'
            value={clientAddress}
          />
        </div>
        <div className={clsx("flex gap-4", "w-full")}>
          <TextInput
            className={clsx("basis-2/12")}
            label='Code postal'
            name='clientZipCodeString'
            onChange={updateTextInputNameSearchParams(router)}
            type='number'
            value={clientZipCode}
          />
          <TextInput
            className={clsx("basis-5/12")}
            label='Ville'
            name='clientCity'
            onChange={updateTextInputNameSearchParams(router)}
            type='text'
            value={clientCity}
          />
          <TextInput
            className={clsx("basis-5/12")}
            label='Pays'
            name='clientCountry'
            onChange={updateTextInputNameSearchParams(router)}
            type='text'
            value={clientCountry}
          />
        </div>
      </div>
    </div>
  );
};
