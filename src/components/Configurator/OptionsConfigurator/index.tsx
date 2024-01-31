import { FC, useContext } from "react";

import clsx from "clsx";

import { SwitchInput } from "@/components/Inputs/SwitchInput";
import { TextInput } from "@/components/Inputs/TextInput";
import { GlobalContext } from "@/contexts/GlobalContext";

import {
  updateNumberInput,
  updateSwitchInput,
} from "../_internal/Configurator.utils";

export const OptionsConfigurator: FC = () => {
  const {
    template,
    invoiceWithDeposit,
    setInvoiceWithDeposit,
    deposit,
    setDeposit,
  } = useContext(GlobalContext) ?? {};

  const showDepositInput =
    template === "deposit" || (template === "invoice" && invoiceWithDeposit);

  return (
    <div className={clsx("w-full", "flex flex-col gap-6")}>
      <p className={clsx("text-xl font-semibold")}>Options</p>
      <div className={clsx("flex flex-col items-start gap-4")}>
        {template === "invoice" && (
          <SwitchInput
            checked={invoiceWithDeposit}
            label='La facture comporte un acompte'
            name='invoiceWithDepositString'
            onChange={updateSwitchInput(setInvoiceWithDeposit)}
          />
        )}
        {showDepositInput && (
          <TextInput
            className={clsx("w-full")}
            label='Acompte (en €)'
            name='depositString'
            onChange={updateNumberInput(setDeposit)}
            type='number'
            value={deposit}
          />
        )}
      </div>
    </div>
  );
};
