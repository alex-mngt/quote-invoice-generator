import { Task } from "./types";

export const downloadFromUrl = (url: string, filename: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};

export const displayArrayWithCommas = (
  array: (string | number | undefined)[],
): (string | number)[] => {
  return array.reduce<(string | number)[]>((acc, curr, idx) => {
    if (curr === undefined) {
      return acc;
    }

    if (idx > 0) {
      acc.push(", ");
    }

    acc.push(curr);

    return acc;
  }, []);
};

export const getTasksFromTasksURLEncoded = (
  tasksURLEncoded: string,
): Task[] | undefined => {
  const tasks = JSON.parse(decodeURIComponent(tasksURLEncoded));

  if (!Array.isArray(tasks)) {
    return undefined;
  }

  for (const task of tasks) {
    if (!isTask(task)) {
      return undefined;
    }
  }

  return tasks;
};

export const isTask = (task: any): task is Task => {
  if (!(task instanceof Object)) {
    return false;
  }

  if (!("name" in task) || !("description" in task) || !("quantity" in task)) {
    return false;
  }

  if (
    (typeof task["name"] !== "string" && task["name"] !== null) ||
    (typeof task["description"] !== "string" && task["description"] !== null) ||
    (typeof task["quantity"] !== "number" && task["quantity"] !== null)
  ) {
    return false;
  }

  return true;
};

export const isPropertyOfTask = (
  string: string,
): string is "name" | "description" | "quantity" => {
  switch (string) {
    case "name":
      return true;
    case "description":
      return true;
    case "quantity":
      return true;
    default:
      return false;
  }
};

export const displayEUR = (price: number) => {
  return Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};
