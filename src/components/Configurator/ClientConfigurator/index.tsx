import { FC, useContext } from "react";

import { clsx } from "clsx";

import { TextInput } from "@/components/Inputs/TextInput";
import { GlobalContext } from "@/contexts/GlobalContext";

import {
  updateNumberInput,
  updateTextInput,
} from "../_internal/Configurator.utils";

export const ClientConfigurator: FC = () => {
  const {
    clientName,
    setClientName,
    clientSIREN,
    setClientSIREN,
    clientAddress,
    setClientAddress,
    clientZipCode,
    setClientZipCode,
    clientCity,
    setClientCity,
    clientCountry,
    setClientCountry,
    clientEmail,
    setClientEmail,
  } = useContext(GlobalContext) ?? {};

  return (
    <div className={clsx("w-full", "flex flex-col gap-6")}>
      <p className={clsx("text-xl font-semibold")}>Client</p>
      <div className={clsx("flex flex-col gap-4")}>
        <TextInput
          label='Nom'
          name='clientName'
          onChange={updateTextInput(setClientName)}
          type='text'
          value={clientName}
        />
        <div className={clsx("flex gap-4", "w-full")}>
          <TextInput
            className={clsx("basis-full")}
            label='SIREN'
            name='clientSIREN'
            onChange={updateTextInput(setClientSIREN)}
            type='text'
            value={clientSIREN}
          />
        </div>
        <div className={clsx("flex gap-4", "w-full")}>
          <TextInput
            className={clsx("basis-full")}
            label='Adresse'
            name='clientAddress'
            onChange={updateTextInput(setClientAddress)}
            type='text'
            value={clientAddress}
          />
        </div>
        <div className={clsx("flex gap-4", "w-full")}>
          <TextInput
            className={clsx("basis-2/12")}
            label='Code postal'
            name='clientZipCodeString'
            onChange={updateNumberInput(setClientZipCode)}
            type='number'
            value={clientZipCode}
          />
          <TextInput
            className={clsx("basis-5/12")}
            label='Ville'
            name='clientCity'
            onChange={updateTextInput(setClientCity)}
            type='text'
            value={clientCity}
          />
          <TextInput
            className={clsx("basis-5/12")}
            label='Pays'
            name='clientCountry'
            onChange={updateTextInput(setClientCountry)}
            type='text'
            value={clientCountry}
          />
        </div>
        <TextInput
          label='Email'
          name='clientEmail'
          onChange={updateTextInput(setClientEmail)}
          type='text'
          value={clientEmail}
        />
      </div>
    </div>
  );
};
