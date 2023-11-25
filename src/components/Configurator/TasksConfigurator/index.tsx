import { ChangeEventHandler, FC, MouseEventHandler } from "react";

import { TrashIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { TextAreaInput } from "@/components/Inputs/TextAreaInput";
import { TextInput } from "@/components/Inputs/TextInput";
import { Task } from "@/lib/types";
import { isPropertyOfTask } from "@/lib/utils";

import { setTasksURLEncodedSearchParam } from "../_internal/Configurator.utils";

type Props = {
  tasks: Task[] | undefined;
};

export const TasksConfigurator: FC<Props> = (props) => {
  const { tasks } = props;

  const router = useRouter();

  const updateTaskFromTasksURLEncodedSearchParam: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    if (tasks === undefined) {
      return;
    }

    const nameMetadata = e.target.name.split("-");

    if (nameMetadata.length < 2) {
      return;
    }

    const idx = Number(nameMetadata[0]);
    const property = nameMetadata[1];

    if (isNaN(idx) || !isPropertyOfTask(property)) {
      return;
    }

    const url = new URL(window.location.href);

    const newTasks = [...tasks];

    if (property === "quantity") {
      newTasks[idx][property] =
        e.target.value !== "" ? Number(e.target.value) : null;
    } else {
      newTasks[idx][property] = e.target.value || null;
    }

    setTasksURLEncodedSearchParam(url, newTasks);

    router.replace(url.href);
  };

  const removeTaskFromTasksURLEncodedParam: (
    idx: number,
  ) => MouseEventHandler<HTMLButtonElement> = (idx) => {
    return () => {
      if (tasks === undefined) {
        return;
      }

      const url = new URL(window.location.href);

      const newTasks = [...tasks];
      newTasks.splice(idx, 1);

      setTasksURLEncodedSearchParam(url, newTasks);

      router.replace(url.href);
    };
  };

  const addTaskToTasksURLEncodedSearchParam: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const url = new URL(window.location.href);

    const newTask: Task = { name: null, description: null, quantity: null };
    const newTasks: Task[] =
      tasks !== undefined ? [...tasks, newTask] : [newTask];

    setTasksURLEncodedSearchParam(url, newTasks);

    router.replace(url.href);
  };

  return (
    <div className={clsx("w-full", "flex flex-col gap-6")}>
      <p className={clsx("text-xl font-semibold")}>Taches</p>
      <div className={clsx("pl-4", "flex flex-col gap-4")}>
        {tasks?.map((task, idx) => (
          <div className={clsx("flex items-start gap-8")} key={idx}>
            <div className={clsx("flex grow flex-col gap-4")}>
              <div className={clsx("flex grow gap-4")}>
                <TextInput
                  className={clsx("basis-2/3")}
                  label='Titre'
                  name={`${idx}-name`}
                  onChange={updateTaskFromTasksURLEncodedSearchParam}
                  type='text'
                  value={task.name === null ? undefined : task.name}
                />
                <TextInput
                  className={clsx("basis-1/3")}
                  label='Quantité'
                  name={`${idx}-quantity`}
                  onChange={updateTaskFromTasksURLEncodedSearchParam}
                  type='number'
                  value={task.quantity === null ? undefined : task.quantity}
                />
              </div>
              <TextAreaInput
                label='Detail'
                name={`${idx}-description`}
                onChange={updateTaskFromTasksURLEncodedSearchParam}
                value={task.description === null ? undefined : task.description}
              />
            </div>
            <Button
              className={clsx("mt-[72px]", " text-white")}
              onClick={removeTaskFromTasksURLEncodedParam(idx)}
            >
              <TrashIcon className={clsx("h-5 w-5")} />
            </Button>
          </div>
        ))}
        <Button
          className={clsx(
            "self-start",
            "transition-all",
            tasks !== undefined && tasks.length > 0
              ? "translate-x-0"
              : "-translate-x-4",
          )}
          onClick={addTaskToTasksURLEncodedSearchParam}
          type='button'
        >
          Ajouter une tache
        </Button>
      </div>
    </div>
  );
};
