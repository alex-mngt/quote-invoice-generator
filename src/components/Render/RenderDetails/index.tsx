import { FC } from "react";

import clsx from "clsx";
import { DateTime } from "luxon";

import { CommonProps } from "@/lib/types";

import { getDetailsNumberName } from "./_internal/RenderDetails.utils";

type Props = {
  invoiceNumber: string | undefined;
  today: DateTime;
  template: string | undefined;
} & CommonProps;

export const RenderDetails: FC<Props> = (props) => {
  let { className, invoiceNumber, today, template } = props;

  return (
    <div className={clsx(className)}>
      <p>
        <span className={clsx("font-semibold")}>
          {getDetailsNumberName(template)} :
        </span>
        &nbsp;
        {invoiceNumber}
      </p>
      <p>
        <span className={clsx("font-semibold")}>Date d&apos;emmission : </span>
        {today.setLocale("fr").toLocaleString()}
      </p>
      <p>
        <span className={clsx("font-semibold")}>
          Date d&apos;{template === "quote" ? "expiration" : "échéance"} :
        </span>
        &nbsp;
        {today.setLocale("fr").plus({ day: 30 }).toLocaleString()}
      </p>
    </div>
  );
};
