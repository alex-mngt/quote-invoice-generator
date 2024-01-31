import { ChangeEventHandler } from "react";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { StateSetter, Task } from "@/lib/types";

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

export const getTextInputNameSearchParamsUpdater: (
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

export const getSwitchInputNameSearchParamsUpdater: (
  router: AppRouterInstance,
) => ChangeEventHandler<HTMLInputElement> = (router) => (e) => {
  const url = new URL(window.location.href);

  url.searchParams.set(e.target.name, `${e.target.checked}`);

  router.replace(url.href);
};

export const updateTextInput = (
  setter: StateSetter<string> | undefined,
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    if (setter === undefined) {
      return;
    }

    setter(e.target.value);
  };
};

export const updateNumberInput = (
  setter: StateSetter<number | undefined> | undefined,
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    if (setter === undefined) {
      return;
    }

    const newValue = e.target.valueAsNumber;

    setter(isNaN(newValue) ? undefined : newValue);
  };
};

export const updateSwitchInput = (
  setter: StateSetter<boolean> | undefined,
): ChangeEventHandler<HTMLInputElement> => {
  return (e) => {
    if (setter === undefined) {
      return;
    }

    setter(e.target.checked);
  };
};
