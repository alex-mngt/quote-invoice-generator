import { ChangeEventHandler, FC } from "react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import { CommonProps } from "@/lib/types";

import { SelectOption } from "./_internal/SelectInput.types";
import { getCurrentValue } from "./_internal/SelectInput.utils";
import { INPUT_STYLING_CLASSNAME } from "../_internal/Inputs.constants";

type Props = {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  selectedIndex: number | undefined;
  onChange: (newSelectedIdx: number) => void;
} & CommonProps;

export const SelectInput: FC<Props> = (props) => {
  const {
    className,
    label,
    name,
    placeholder,
    onChange,
    options,
    selectedIndex,
  } = props;

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(Number(e.target.value));
  };

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
          onChange={handleChange}
          value={getCurrentValue(selectedIndex, placeholder)}
        >
          {placeholder !== undefined ? (
            <option disabled value=''>
              {placeholder}
            </option>
          ) : null}
          {options.map((option, idx) => (
            <option disabled={option.disabled} key={option.value} value={idx}>
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
