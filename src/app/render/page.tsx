import { FC } from "react";

import { RenderPageSearchParams } from "./_internal/RenderPage.types";

type Props = {
  searchParams: RenderPageSearchParams;
};

const RenderPage: FC<Props> = (props) => {
  const { searchParams } = props;
  const { companyName, invoiceNumber } = searchParams;

  return (
    <>
      <h1>Facture</h1>
      <p>Entreprise : {companyName}</p>
      <p>Facture num : {invoiceNumber}</p>
    </>
  );
};

export default RenderPage;
