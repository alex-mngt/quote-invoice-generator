import { ChangeEventHandler, FC } from "react";

import { clsx } from "clsx";

import { CommonProps } from "@/lib/types";

import { INPUT_STYLING_CLASSNAME } from "../_internal/Inputs.constants";

type Props = {
  label: string;
  name: string;
  value: string | undefined;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
} & CommonProps;

export const TextAreaInput: FC<Props> = (props) => {
  const { name, label, onChange, value, className } = props;

  return (
    <div className={clsx(className, "flex flex-col gap-2")}>
      <label className={clsx("font-medium")} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={clsx(INPUT_STYLING_CLASSNAME)}
        id={name}
        name={name}
        onChange={onChange}
        value={value || ""}
      />
    </div>
  );
};
