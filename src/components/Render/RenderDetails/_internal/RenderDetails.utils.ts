export const getDetailsNumberName = (
  template: string | undefined,
): string | undefined => {
  switch (template) {
    case "quote":
      return "Numéro de devis";
    case "invoice":
      return "Numéro de facture";
    case "deposit":
      return "Numéro de facture";
    default:
      return;
  }
};
