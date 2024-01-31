import { Template } from "@/lib/types";

import { TEMPLATE_OPTIONS } from "./BaseConfigurator.constants";

export const getSelectedTemplateIndex = (
  selectedTemplate: Template | undefined,
) => {
  return selectedTemplate === undefined
    ? 0
    : TEMPLATE_OPTIONS.findIndex((option) => option.value === selectedTemplate);
};
