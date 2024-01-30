import { FC } from "react";

import clsx from "clsx";

import { CommonProps } from "@/lib/types";
import { displayArrayWithCommas } from "@/lib/utils";

type Props = {
  clientName: string | undefined;
  clientSIREN: string | undefined;
  clientAddress: string | undefined;
  clientZipCode: number | undefined;
  clientCity: string | undefined;
  clientCountry: string | undefined;
  clientEmail: string | undefined;
} & CommonProps;

export const RenderParties: FC<Props> = (props) => {
  const {
    className,
    clientName,
    clientSIREN,
    clientAddress,
    clientZipCode,
    clientCity,
    clientCountry,
    clientEmail,
  } = props;
  return (
    <div className={clsx(className, "flex")}>
      <div className='flex flex-1 flex-col gap-1'>
        <p className={clsx("mb-2", "text-lg font-semibold")}>
          {process.env.NEXT_PUBLIC_COMPANY_NAME}
        </p>
        <p>{process.env.NEXT_PUBLIC_COMPANY_ADDRESS}</p>
        <p>
          {process.env.NEXT_PUBLIC_COMPANY_ZIP_CODE},&nbsp;
          {process.env.NEXT_PUBLIC_COMPANY_CITY},&nbsp;
          {process.env.NEXT_PUBLIC_COMPANY_COUNTRY}
        </p>
        <a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}>
          {process.env.NEXT_PUBLIC_COMPANY_EMAIL}
        </a>
        <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}>
          {process.env.NEXT_PUBLIC_COMPANY_PHONE}
        </a>
      </div>
      <div className='flex flex-1 flex-col gap-1'>
        <p className={clsx("mb-2", "text-lg font-semibold")}>{clientName}</p>
        <p>
          <span className={clsx("font-medium")}>SIREN : </span>
          {clientSIREN}
        </p>
        <p>{clientAddress}</p>
        <p>
          {displayArrayWithCommas([clientZipCode, clientCity, clientCountry])}
        </p>
        <a href={`mailto:${clientEmail}`}>{clientEmail}</a>
      </div>
    </div>
  );
};
