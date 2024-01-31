import { SelectOption } from "@/components/Inputs/SelectInput/_internal/SelectInput.types";
import { Template } from "@/lib/types";

export const TEMPLATE_OPTIONS: SelectOption<Template>[] = [
  { display: "Facture", value: "invoice" },
  { display: "Devis", value: "quote" },
  { display: "Acompte", value: "deposit" },
];
