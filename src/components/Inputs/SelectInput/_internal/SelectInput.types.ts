export type SelectOption<T extends string = string> = {
  display: string;
  value: T;
  disabled?: boolean;
};
