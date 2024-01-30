import { ChangeEventHandler, FC } from "react";

import clsx from "clsx";

type Props = {
  label: string;
  name: string;
  checked: boolean | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const SwitchInput: FC<Props> = (props) => {
  const { label, name, checked, onChange } = props;

  return (
    <div className={clsx("flex flex-row-reverse items-center gap-2")}>
      <label className={clsx("cursor-pointer font-medium")} htmlFor={name}>
        {label}
      </label>
      <input
        checked={checked || false}
        id={name}
        name={name}
        onChange={onChange}
        type='checkbox'
      />
    </div>
  );
};
