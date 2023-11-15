import { FC, PropsWithChildren } from "react";

import { clsx } from "clsx";

import { ButtonType } from "./_internal/Button.types";

type Props = {
  type?: ButtonType;
} & PropsWithChildren;

export const Button: FC<Props> = (props) => {
  const { children, type } = props;

  return (
    <button
      className={clsx("p-2", "rounded bg-black", "text-white")}
      type={type || "button"}
    >
      {children}
    </button>
  );
};
