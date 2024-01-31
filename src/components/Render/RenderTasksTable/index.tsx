import { FC } from "react";

import clsx from "clsx";

import { CommonProps, Task } from "@/lib/types";
import { displayEUR } from "@/lib/utils";

import { TaskLine } from "./TaskLine";

type Props = {
  template: string | undefined;
  invoiceObject: string | undefined;
  deposit: number | undefined;
  invoiceWithDeposit: boolean | undefined;
  tasks: Task[] | undefined;
} & CommonProps;

export const RenderTasksTable: FC<Props> = (props) => {
  const {
    invoiceObject,
    tasks,

    className,
    template,
    deposit,
    invoiceWithDeposit,
  } = props;

  const isDeposit = template === "deposit";
  const isInvoice = template === "invoice";

  const ADR = Number(process.env.NEXT_PUBLIC_COMPANY_ADR);

  return !isNaN(ADR) ? (
    <div className={clsx(className, "flex flex-col gap-6")}>
      <div className={clsx("flex justify-between gap-4")}>
        <p>
          <span className={clsx("font-semibold")}>Objet :</span>
          &nbsp;
          <span
            className={clsx("transition-all", !invoiceObject && "opacity-0")}
          >
            {invoiceObject}
          </span>
        </p>
        {!isDeposit && (
          <p>
            <span className={clsx("font-semibold")}>TJM :</span>
            &nbsp;
            {process.env.NEXT_PUBLIC_COMPANY_ADR}€
          </p>
        )}
      </div>
      <div
        className={clsx(
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
          className={clsx(
            "px-3 py-2",
            "bg-black",

            "font-medium text-white",
          )}
        >
          <p className={clsx(isDeposit && "opacity-0")}>Jour(s)</p>
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
        {isDeposit && deposit !== undefined ? (
          <TaskLine
            hideQuantity
            task={{ name: "Acompte", description: "", quantity: 1 }}
            unitPrice={deposit}
          />
        ) : (
          <>
            {tasks?.map((task, idx) => (
              <TaskLine key={idx} task={task} unitPrice={ADR} />
            ))}
            {isInvoice && invoiceWithDeposit && deposit !== undefined && (
              <TaskLine
                hideQuantity
                task={{ name: "Acompte", description: "", quantity: 1 }}
                unitPrice={-deposit}
              />
            )}
          </>
        )}
      </div>
      <p className={clsx("text-right font-semibold")}>
        Total HT* :&nbsp;
        {displayEUR(
          isDeposit && deposit !== undefined
            ? deposit
            : tasks !== undefined
              ? tasks.reduce(
                  (total, task) => {
                    total += (task.quantity || 0) * ADR;

                    return total;
                  },
                  isInvoice && invoiceWithDeposit && deposit !== undefined
                    ? -deposit
                    : 0,
                )
              : isInvoice && invoiceWithDeposit && deposit !== undefined
                ? -deposit
                : 0,
        )}
      </p>
      <p className={clsx("text-sm")}>
        * TVA non applicable - article 293 B du CGI
      </p>
    </div>
  ) : (
    <p>invalid ADR</p>
  );
};
