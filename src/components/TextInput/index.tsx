import { FC } from "react";

import { clsx } from "clsx";

type Props = {
  label: string;
  name: string;
};

export const TextInput: FC<Props> = (props) => {
  const { name, label } = props;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        className={clsx("px-2 py-1", "rounded border border-black")}
        id={name}
        name={name}
        type='text'
      />
    </>
  );
};
