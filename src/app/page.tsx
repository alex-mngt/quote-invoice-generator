import { FC } from "react";

import { clsx } from "clsx";

import { PDFForm } from "@/components/PDFForm";

const Home: FC = () => {
  return (
    <main className={clsx("p-3")}>
      <PDFForm />
    </main>
  );
};

export default Home;
