export const getTitle = (template: string | undefined): string | undefined => {
  switch (template) {
    case "quote":
      return "Devis";
    case "invoice":
      return "Facture";
    case "deposit":
      return "Facture d'acompte";
    default:
      return;
  }
};
