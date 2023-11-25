import { FC } from "react";

import { CommonProps } from "@/lib/types";

import { RenderBaseLayout } from "../Render/RenderBaseLayout";

type Props = {
  render: boolean;
  template: string | undefined;
} & CommonProps;

export const Quote: FC<Props> = (props) => {
  const { className, render, template } = props;
  return (
    <RenderBaseLayout
      className={className}
      render={render}
      template={template}
    ></RenderBaseLayout>
  );
};
