"use client";

import { ChangeEventHandler, FC } from "react";

import { clsx } from "clsx";

import { CommonProps } from "@/lib/types";

import { INPUT_STYLING_CLASSNAME } from "../_internal/Inputs.constants";

type BaseProps = {
  label: string;
  name: string;
};

type TextProps = {
  value: string | undefined;
  type: "text";
  onChange: ChangeEventHandler<HTMLInputElement>;
};

type NumberProps = {
  value: number | undefined;
  type: "number";
  onChange: ChangeEventHandler<HTMLInputElement>;
};

type Props = BaseProps & (TextProps | NumberProps) & CommonProps;

export const TextInput: FC<Props> = (props) => {
  const { name, label, onChange, value, type, className } = props;

  return (
    <div className={clsx(className, "flex flex-col items-start gap-2")}>
      <label className={clsx("cursor-pointer font-medium")} htmlFor={name}>
        {label}
      </label>
      <input
        className={clsx(INPUT_STYLING_CLASSNAME)}
        id={name}
        name={name}
        onChange={onChange}
        type={type}
        value={value || ""}
      />
    </div>
  );
};
