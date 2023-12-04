import { FC, PropsWithChildren } from "react";

import { clsx } from "clsx";

import { WeAreStudio99 } from "@/components/icons/WeAreStudio99";
import { PDF_MARGINS } from "@/lib/constants";
import { CommonProps } from "@/lib/types";

type Props = {
  render: boolean;
  template: string | undefined;
} & PropsWithChildren &
  CommonProps;

export const RenderBaseLayout: FC<Props> = (props) => {
  const { className, render, children, template } = props;

  return (
    <main
      className={clsx(className, !render && `w-[21cm]`, "no-scrollbar")}
      style={{
        padding: `${PDF_MARGINS.top} ${PDF_MARGINS.right} ${PDF_MARGINS.bottom} ${PDF_MARGINS.left}`,
      }}
    >
      <div className={clsx("flex justify-between", "mb-8")}>
        <h1 className={clsx("text-3xl font-semibold")}>
          {template === "quote" ? "Devis" : "Facture"}
        </h1>
        <WeAreStudio99 className='w-12' />
      </div>
      {children}
    </main>
  );
};
