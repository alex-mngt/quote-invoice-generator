import { ChangeEventHandler } from "react";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { Task } from "@/lib/types";

export const setTasksURLEncodedSearchParam = (url: URL, tasks: Task[]) => {
  url.searchParams.set(
    "tasksURLEncoded",
    encodeURIComponent(
      JSON.stringify(tasks, (_, value) => {
        if (value === undefined) {
          value = null;
        }

        return value;
      }),
    ),
  );
};

export const updateTextInputNameSearchParams: (
  router: AppRouterInstance,
) => ChangeEventHandler<HTMLInputElement> = (router) => (e) => {
  const url = new URL(window.location.href);

  if (e.target.value === "") {
    url.searchParams.delete(e.target.name);
    router.replace(url.href);
    return;
  }

  url.searchParams.set(e.target.name, e.target.value);

  router.replace(url.href);
};
