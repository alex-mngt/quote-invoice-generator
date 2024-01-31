import { Dispatch, SetStateAction } from "react";

import { TEMPLATE_VALUES } from "./constants";

export type CommonProps = {
  className?: string;
};

export type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type Task = {
  name: string;
  description: string;
  quantity: number | undefined;
};

export type Template = (typeof TEMPLATE_VALUES)[number];
