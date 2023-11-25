import { FC } from "react";

import clsx from "clsx";
import { DateTime } from "luxon";

import { CommonProps } from "@/lib/types";

type Props = { today: DateTime; template: string | undefined } & CommonProps;

export const RenderPayment: FC<Props> = (props) => {
  const { today, className, template } = props;

  return (
    <div className={clsx(className, "p-6", "rounded bg-neutral-100")}>
      {template === "quote" ? (
        <p className='text-sm text-neutral-600'>
          {process.env.NEXT_PUBLIC_COMPANY_NAME} · La facture correspondant à ce
          devis devra être réglée sous 30 jours à compter de sa date
          d&apos;émission. Passé ce délais, une pénalité de retard de 10% sera
          appliquée, ainsi qu&apos;une indemnité forfaitaire de 40€ due au titre
          de frais de recouvrement. Pas d&apos;escompte pour règlement anticipé.
        </p>
      ) : (
        <>
          <p className={clsx("mb-4", "text-lg font-semibold")}>
            Détails du paiement
          </p>
          <div className={clsx("mb-4 flex flex-col gap-1")}>
            <p>
              <span className={clsx("font-semibold")}>
                Titulaire du compte :
              </span>{" "}
              {process.env.NEXT_PUBLIC_COMPANY_ACCOUNT_HOLDER}
            </p>
            <p>
              <span className={clsx("font-semibold")}>IBAN :</span>{" "}
              {process.env.NEXT_PUBLIC_COMPANY_IBAN}
            </p>
            <p>
              <span className={clsx("font-semibold")}>BIC :</span>{" "}
              {process.env.NEXT_PUBLIC_COMPANY_BIC}
            </p>
          </div>
          <p className={clsx("text-sm text-neutral-600")}>
            {process.env.NEXT_PUBLIC_COMPANY_NAME} vous a envoyé cette facture
            le{" "}
            {today.setLocale("fr").toLocaleString({
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            . Celle ci doit être réglée sous 30 jours à compter de cette date.
            Passé ce délais, une pénalité de retard de 10% sera appliquée, ainsi
            qu&apos;une indemnité forfaitaire de 40€ due au titre de frais de
            recouvrement. Pas d&apos;escompte pour règlement anticipé.
          </p>
        </>
      )}
    </div>
  );
};
