import { ChangeEventHandler, FC } from "react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import { CommonProps } from "@/lib/types";

import { SelectOption } from "./_internal/SelectInput.types";
import { INPUT_STYLING_CLASSNAME } from "../_internal/Inputs.constants";

type Props = {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  value: string | undefined;
  onChange: ChangeEventHandler<HTMLSelectElement>;
} & CommonProps;

export const SelectInput: FC<Props> = (props) => {
  const { className, label, name, placeholder, onChange, options, value } =
    props;

  return (
    <div className={clsx(className, "flex flex-col items-start gap-2")}>
      <label className={clsx("cursor-pointer font-medium")} htmlFor={name}>
        {label}
      </label>
      <div className={clsx("relative", "w-full")}>
        <select
          className={clsx(INPUT_STYLING_CLASSNAME, "pr-7", "appearance-none")}
          id={name}
          name={name}
          onChange={onChange}
          value={value || ""}
        >
          {placeholder !== undefined ? (
            <option disabled value=''>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              {option.display}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          className={clsx("absolute bottom-0 right-1 top-0 m-auto", "h-5 w-5")}
        />
      </div>
    </div>
  );
};
