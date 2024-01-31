import { FC } from "react";

import clsx from "clsx";
import { DateTime } from "luxon";

import { CommonProps, Template } from "@/lib/types";

import { getDetailsNumberName } from "./_internal/RenderDetails.utils";

type Props = {
  invoiceNumber: string | undefined;
  today: DateTime;
  template: Template | undefined;
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
        <span className={clsx("transition-all", !invoiceNumber && "opacity-0")}>
          {invoiceNumber}
        </span>
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
