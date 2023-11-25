import { TEMPLATE_OPTIONS } from "./BaseConfigurator.constants";

export const getSelectedTemplateIndex = (selectedTemplate: string | null) => {
  return selectedTemplate === null
    ? 0
    : TEMPLATE_OPTIONS.findIndex((option) => option.value === selectedTemplate);
};
