import { FC } from "react";

import clsx from "clsx";

import { Task } from "@/lib/types";
import { displayEUR } from "@/lib/utils";

type Props = {
  task: Task;
  unitPrice: number;
  hideQuantity?: boolean;
};

export const TaskLine: FC<Props> = (props) => {
  const { task, unitPrice, hideQuantity } = props;
  const { name, description, quantity } = task;

  return (
    <>
      <div
        className={clsx(
          "h-full p-3 [&:nth-child(n+7)]:pt-1",
          "border-l border-neutral-400 [&:nth-last-child(-n+3)]:border-b [&:nth-last-child(3)]:rounded-bl",
          "flex flex-col justify-center",
          "text-sm",
        )}
      >
        <p className={clsx("text-neutral-800", "font-medium")}>{name}</p>
        <p className={clsx("text-neutral-600")}>{description}</p>
      </div>
      <div
        className={clsx(
          "h-full p-3 [&:nth-child(n+7)]:pt-1",
          "flex items-center",
          "border-neutral-400 [&:nth-last-child(-n+3)]:border-b",
          "text-sm text-neutral-800",
        )}
      >
        <p className={clsx(hideQuantity && "opacity-0")}>{quantity}</p>
      </div>
      <div
        className={clsx(
          "h-full p-3 [&:nth-child(n+7)]:pt-1",
          "flex items-center justify-end",
          "border-r border-neutral-400 [&:nth-last-child(-n+3)]:border-b [&:nth-last-child(1)]:rounded-br",
          "text-right text-sm text-neutral-800",
        )}
      >
        {displayEUR(quantity !== null ? quantity * unitPrice : 0)}
      </div>
    </>
  );
};
