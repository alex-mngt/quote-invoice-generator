import { FC, Fragment } from "react";

import clsx from "clsx";

import { CommonProps, Task } from "@/lib/types";
import { displayEUR } from "@/lib/utils";

type Props = {
  invoiceObject: string | undefined;
  tasks: Task[] | undefined;
  ADR: number;
} & CommonProps;

export const RenderTasks: FC<Props> = (props) => {
  const { invoiceObject, tasks, ADR, className } = props;

  return (
    <div className={clsx(className, "flex flex-col gap-6")}>
      <div className={clsx("flex justify-between gap-4")}>
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
      <p className={clsx("text-sm")}>
        * TVA non applicable - article 293 B du CGI
      </p>
    </div>
  );
};
