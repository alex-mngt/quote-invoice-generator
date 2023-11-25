import { FC } from "react";

import clsx from "clsx";
import { DateTime } from "luxon";

import { CommonProps } from "@/lib/types";

type Props = {
  invoiceNumber: string | undefined;
  today: DateTime;
  template: string | undefined;
} & CommonProps;

export const RenderDetails: FC<Props> = (props) => {
  const { className, invoiceNumber, today, template } = props;

  return (
    <div className={clsx(className)}>
      <p>
        <span className={clsx("font-semibold")}>
          Numero de {template === "quote" ? "devis" : "facture"} :{" "}
        </span>
        {invoiceNumber}
      </p>
      <p>
        <span className={clsx("font-semibold")}>Date d&apos;emmission : </span>
        {today.setLocale("fr").toLocaleString()}
      </p>
      <p>
        <span className={clsx("font-semibold")}>
          Date d&apos;{template === "quote" ? "expiration" : "échéance"} :{" "}
        </span>
        {today.setLocale("fr").plus({ day: 30 }).toLocaleString()}
      </p>
    </div>
  );
};
