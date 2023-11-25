import { FC, Fragment } from "react";

import { clsx } from "clsx";
import { DateTime } from "luxon";

import { CommonProps, Task } from "@/lib/types";
import { displayArrayWithCommas, displayEUR } from "@/lib/utils";

import { WeAreStudio99 } from "../icons/WeAreStudio99";

type Props = {
  render: boolean;
  invoiceNumber: string | undefined;
  invoiceObject: string | undefined;
  clientName: string | undefined;
  clientAddress: string | undefined;
  clientZipCode: number | undefined;
  clientCity: string | undefined;
  clientCountry: string | undefined;
  clientEmail: string | undefined;
  tasks: Task[] | undefined;
} & CommonProps;

export const Invoice: FC<Props> = (props) => {
  const {
    render,
    className,
    invoiceNumber,
    invoiceObject,
    clientName,
    clientAddress,
    clientZipCode,
    clientCity,
    clientCountry,
    clientEmail,
    tasks,
  } = props;

  const today = DateTime.now();

  const ADR = Number(process.env.NEXT_PUBLIC_COMPANY_ADR);

  const isADRNumber = !isNaN(ADR);

  return isADRNumber ? (
    <main
      className={clsx(className, !render && "w-[21cm] p-[2cm]", "no-scrollbar")}
    >
      <div className={clsx("flex justify-between", "mb-8")}>
        <h1 className={clsx("text-3xl font-semibold")}>Facture</h1>
        <WeAreStudio99 className='w-12' />
      </div>
      <div className={clsx("mb-8")}>
        <p>
          <span className={clsx("font-semibold")}>Numero de facture : </span>
          {invoiceNumber}
        </p>
        <p>
          <span className={clsx("font-semibold")}>
            Date d&apos;emmission :{" "}
          </span>
          {today.setLocale("fr").toLocaleString()}
        </p>
        <p>
          <span className={clsx("font-semibold")}>Date d&apos;échéance : </span>
          {today.setLocale("fr").plus({ day: 30 }).toLocaleString()}
        </p>
      </div>
      <div className={clsx("mb-8 flex")}>
        <div className='flex flex-1 flex-col gap-1'>
          <p className={clsx("mb-2", "text-lg font-semibold")}>
            {process.env.NEXT_PUBLIC_COMPANY_NAME}
          </p>
          <p>{process.env.NEXT_PUBLIC_COMPANY_ADDRESS}</p>
          <p>
            {process.env.NEXT_PUBLIC_COMPANY_ZIP_CODE},{" "}
            {process.env.NEXT_PUBLIC_COMPANY_CITY},{" "}
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
          <p>{clientAddress}</p>
          <p>
            {displayArrayWithCommas([clientZipCode, clientCity, clientCountry])}
          </p>
          <a href={`mailto:${clientEmail}`}>{clientEmail}</a>
        </div>
      </div>
      <div className={clsx("mb-6", "flex justify-between gap-4")}>
        <p>
          <span className={clsx("font-semibold")}>Objet :</span> {invoiceObject}
        </p>
        <p>
          <span className={clsx("font-semibold")}>TJM :</span>{" "}
          {process.env.NEXT_PUBLIC_COMPANY_ADR}€
        </p>
      </div>
      <div
        className={clsx(
          "mb-6",
          "grid items-center [grid-template-columns:4fr_1fr_1fr]",
        )}
      >
        <div
          className={clsx(
            "px-3 py-2",
            "rounded-tl bg-black",
            "font-medium text-white",
          )}
        >
          <p>Description</p>
        </div>
        <div
          className={clsx("px-3 py-2", "bg-black", "font-medium text-white")}
        >
          <p>Jour(s)</p>
        </div>
        <div
          className={clsx(
            "px-3 py-2",
            "bg-black",
            "rounded-tr text-right font-semibold text-white",
          )}
        >
          <p>Total</p>
        </div>
        {tasks?.map((task, idx) => (
          <Fragment key={idx}>
            <div
              className={clsx(
                "h-full p-3",
                "[:nth-child(n*3)]:rounded rounded-bl border-b border-l border-neutral-400",
                "flex flex-col justify-center",
                "text-sm",
              )}
            >
              <p className={clsx("text-neutral-800", "font-medium")}>
                {task.name}
              </p>
              <p className={clsx("text-neutral-600")}>{task.description}</p>
            </div>
            <div
              className={clsx(
                "h-full p-3",
                "flex items-center",
                "border-b border-neutral-400",
                "text-sm text-neutral-800",
              )}
            >
              <p>{task.quantity}</p>
            </div>
            <div
              className={clsx(
                "h-full p-3",
                "flex items-center justify-end",
                "[:nth-child(n*3+2)]:rounded rounded-br border-b border-r border-neutral-400",
                "text-right text-sm text-neutral-800",
              )}
            >
              {displayEUR(task.quantity !== null ? task.quantity * ADR : 0)}
            </div>
          </Fragment>
        ))}
      </div>
      <p className={clsx("text-right font-semibold")}>
        Total HT* :{" "}
        {displayEUR(
          tasks
            ? tasks.reduce((total, task) => {
                total += (task.quantity || 0) * ADR;

                return total;
              }, 0)
            : 0,
        )}
      </p>
      <p className={clsx("mb-9", "text-sm")}>
        * TVA non applicable - article 293 B du CGI
      </p>
      <div className={clsx("mb-9", "p-6", "rounded bg-neutral-100")}>
        <p className={clsx("mb-4", "text-lg font-semibold")}>
          Détails du paiement
        </p>
        <div className={clsx("mb-4 flex flex-col gap-1")}>
          <p>
            <span className={clsx("font-semibold")}>Titulaire du compte :</span>{" "}
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
          {process.env.NEXT_PUBLIC_COMPANY_NAME} vous a envoyé cette facture le{" "}
          {today
            .setLocale("fr")
            .toLocaleString({ day: "numeric", month: "long", year: "numeric" })}
          . Celle ci doit être réglée sous 30 jours à compter de cette date.
          Passé ce délais, une pénalité de retard de 10% sera appliquée, ainsi
          qu&apos;une indemnité forfaitaire de 40€ due au titre de frais de
          recouvrement. Pas d&apos;escompte pour règlement anticipé.
        </p>
      </div>
      <div className={clsx("text-sm text-neutral-400")}>
        <p>
          Dispensé d’immatriculation au Registre du Commerce et des Sociétés et
          au répertoire des métiers
        </p>
        <p>
          Siège social : {process.env.NEXT_PUBLIC_COMPANY_ADDRESS},{" "}
          {process.env.NEXT_PUBLIC_COMPANY_ZIP_CODE},{" "}
          {process.env.NEXT_PUBLIC_COMPANY_CITY},{" "}
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
    </main>
  ) : (
    <p>invalid ADR</p>
  );
};
