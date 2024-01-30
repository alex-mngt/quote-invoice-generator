import { FC } from "react";

import clsx from "clsx";
import { useRouter } from "next/navigation";

import { SwitchInput } from "@/components/Inputs/SwitchInput";
import { TextInput } from "@/components/Inputs/TextInput";

import {
  getSwitchInputNameSearchParamsUpdater,
  getTextInputNameSearchParamsUpdater,
} from "../_internal/Configurator.utils";

type Props = {
  template: string | undefined;
  deposit: number | undefined;
  invoiceWithDeposit: boolean | undefined;
};

export const OptionsConfigurator: FC<Props> = (props) => {
  const { template, deposit, invoiceWithDeposit } = props;

  const router = useRouter();

  const updateTextInputNameSearchParams =
    getTextInputNameSearchParamsUpdater(router);
  const updateSwitchInputNameSearchParams =
    getSwitchInputNameSearchParamsUpdater(router);

  console.log(template);

  const showDepositInput =
    template === "deposit" || (template === "invoice" && invoiceWithDeposit);

  console.log(showDepositInput);

  return (
    <div className={clsx("w-full", "flex flex-col gap-6")}>
      <p className={clsx("text-xl font-semibold")}>Options</p>
      <div className={clsx("flex flex-col items-start gap-4")}>
        {template === "invoice" && (
          <SwitchInput
            checked={invoiceWithDeposit}
            label='La facture comporte un acompte'
            name='invoiceWithDepositString'
            onChange={updateSwitchInputNameSearchParams}
          />
        )}
        {showDepositInput && (
          <TextInput
            className={clsx("w-full")}
            label='Acompte (en €)'
            name='depositString'
            onChange={updateTextInputNameSearchParams}
            type='number'
            value={deposit}
          />
        )}
      </div>
    </div>
  );
};
