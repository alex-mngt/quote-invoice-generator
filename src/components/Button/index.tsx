import { FC, MouseEventHandler, PropsWithChildren } from "react";

import { clsx } from "clsx";

import { CommonProps } from "@/lib/types";

import { ButtonType } from "./_internal/Button.types";

type Props = {
  type?: ButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & PropsWithChildren &
  CommonProps;

export const Button: FC<Props> = (props) => {
  const { children, type, onClick, className } = props;

  return (
    <button
      className={clsx(className, "px-3 py-2", "rounded bg-black", "text-white")}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
};
