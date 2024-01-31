import { FC } from "react";

import { clsx } from "clsx";

import { Configurator } from "@/components/Configurator";
import { Render } from "@/components/Render";

import { HomePageSearchParams } from "./_internal/HomePage.types";

type Props = {
  searchParams: HomePageSearchParams;
};

const Home: FC<Props> = (props) => {
  const { searchParams } = props;
  const { render } = searchParams;

  return render !== "true" ? (
    <Render render={true} searchParamsValues={searchParams} />
  ) : (
    <div className={clsx("h-screen overflow-hidden", "flex")}>
      <Render
        className={clsx("overflow-y-scroll")}
        render={false}
        searchParamsValues={searchParams}
      />
      <Configurator className={clsx("flex-1", "overflow-y-scroll")} />
    </div>
  );
};

export default Home;
