export const getRenderTitle = (
  template: string | undefined,
): string | undefined => {
  switch (template) {
    case "quote":
      return "Devis";
    case "invoice":
      return "Facture";
    case "deposit":
      return "Acompte";
    default:
      return undefined;
  }
};
