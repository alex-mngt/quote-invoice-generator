import { FC, PropsWithChildren } from "react";

import { clsx } from "clsx";
import localFont from "next/font/local";

import { GlobalContextProvider } from "@/contexts/GlobalContext";

import type { Metadata } from "next";

import "./globals.css";

const neueMontreal = localFont({
  src: "./PPNeueMontreal-Variable.woff2",
  variable: "--font-neue-montreal",
});

export const metadata: Metadata = {
  title: "WeAreStudio99 - Quote & Invoice Generator (beta)",
  description: "Generate quotes and invoices for your clients.",
  robots: "noindex",
};

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <html lang='fr'>
      <body
        className={clsx(neueMontreal.className, "[print-color-adjust:exact]")}
      >
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
