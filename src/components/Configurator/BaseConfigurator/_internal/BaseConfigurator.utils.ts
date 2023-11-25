import { TEMPLATE_OPTIONS } from "./BaseConfigurator.constants";

export const getSelectedTemplateIndex = (
  selectedTemplate: string | null | undefined,
) => {
  return selectedTemplate === null || selectedTemplate === undefined
    ? 0
    : TEMPLATE_OPTIONS.findIndex((option) => option.value === selectedTemplate);
};
