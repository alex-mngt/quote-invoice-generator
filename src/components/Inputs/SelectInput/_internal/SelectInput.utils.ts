export const getCurrentValue = (
  selectedIndex: number | undefined,
  placeholder: string | undefined,
): string | number => {
  if (selectedIndex !== undefined) {
    return selectedIndex;
  }

  if (placeholder !== undefined) {
    return "";
  }

  return 0;
};
