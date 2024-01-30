import { FC } from "react";

import clsx from "clsx";

import { CommonProps } from "@/lib/types";

type Props = {} & CommonProps;

export const RenderLegal: FC<Props> = () => {
  return (
    <div className={clsx("text-sm text-neutral-400")}>
      <p>
        Dispensé d’immatriculation au Registre du Commerce et des Sociétés et au
        répertoire des métiers
      </p>
      <p>
        Siège social : {process.env.NEXT_PUBLIC_COMPANY_ADDRESS},&nbsp;
        {process.env.NEXT_PUBLIC_COMPANY_ZIP_CODE},&nbsp;
        {process.env.NEXT_PUBLIC_COMPANY_CITY},&nbsp;
        {process.env.NEXT_PUBLIC_COMPANY_COUNTRY}
      </p>
      <div className={clsx("flex items-center gap-1")}>
        <p>email : {process.env.NEXT_PUBLIC_COMPANY_EMAIL}</p>
        <span>-</span>
        <p>SIREN : {process.env.NEXT_PUBLIC_COMPANY_SIREN}</p>
        <span>-</span>
        <p>Code NAF {process.env.NEXT_PUBLIC_COMPANY_NAF}</p>
      </div>
    </div>
  );
};
