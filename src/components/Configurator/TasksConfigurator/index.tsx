import { ChangeEventHandler, FC, MouseEventHandler, useContext } from "react";

import { TrashIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import { Button } from "@/components/Button";
import { TextAreaInput } from "@/components/Inputs/TextAreaInput";
import { TextInput } from "@/components/Inputs/TextInput";
import { GlobalContext } from "@/contexts/GlobalContext";
// import { isPropertyOfTask } from "@/lib/utils";

export const TasksConfigurator: FC = () => {
  const { tasks, setTasks } = useContext(GlobalContext) ?? {};

  // const updateTaskFromTasksURLEncodedSearchParam: ChangeEventHandler<
  //   HTMLInputElement | HTMLTextAreaElement
  // > = (e) => {
  //   if (tasks === undefined) {
  //     return;
  //   }

  //   const nameMetadata = e.target.name.split("-");

  //   if (nameMetadata.length < 2) {
  //     return;
  //   }

  //   const idx = Number(nameMetadata[0]);
  //   const property = nameMetadata[1];

  //   if (isNaN(idx) || !isPropertyOfTask(property)) {
  //     return;
  //   }

  //   const url = new URL(window.location.href);

  //   const newTasks = [...tasks];

  //   if (property === "quantity") {
  //     newTasks[idx][property] =
  //       e.target.value !== "" ? Number(e.target.value) : null;
  //   } else {
  //     newTasks[idx][property] = e.target.value || null;
  //   }

  //   setTasksURLEncodedSearchParam(url, newTasks);

  //   router.replace(url.href);
  // };

  const getUpdateTaskTextInput = (
    idx: number,
    property: "name" | "description",
  ): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
    return (e) => {
      if (setTasks === undefined) {
        return;
      }

      setTasks((tasks) => {
        const newTasks = [...tasks];
        newTasks[idx][property] = e.target.value;

        return newTasks;
      });
    };
  };

  const getUpdateTaskQuantity = (
    idx: number,
  ): ChangeEventHandler<HTMLInputElement> => {
    return (e) => {
      if (setTasks === undefined) {
        return;
      }

      setTasks((tasks) => {
        const newTasks = [...tasks];

        const newValue = e.target.valueAsNumber;

        newTasks[idx].quantity = isNaN(newValue) ? undefined : newValue;

        return newTasks;
      });
    };
  };

  const getRemoveTask = (idx: number): MouseEventHandler<HTMLButtonElement> => {
    return () => {
      if (setTasks === undefined) {
        return;
      }

      setTasks((tasks) => {
        const newTasks = [...tasks];
        newTasks.splice(idx, 1);

        return newTasks;
      });
    };
  };

  const addTask: MouseEventHandler<HTMLButtonElement> = () => {
    if (setTasks === undefined) {
      return;
    }

    setTasks((tasks) => {
      return [...tasks, { name: "", description: "", quantity: undefined }];
    });
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
                  label='Nom'
                  name={`task-${idx}-name`}
                  onChange={getUpdateTaskTextInput(idx, "name")}
                  type='text'
                  value={task.name}
                />
                <TextInput
                  className={clsx("basis-1/3")}
                  label='Jour(s)'
                  name={`task-${idx}-quantity`}
                  onChange={getUpdateTaskQuantity(idx)}
                  type='number'
                  value={task.quantity}
                />
              </div>
              <TextAreaInput
                label='Description'
                name={`task-${idx}-description`}
                onChange={getUpdateTaskTextInput(idx, "description")}
                value={task.description}
              />
            </div>
            <Button
              className={clsx("mt-[72px]", "h-[34px]", " text-white")}
              onClick={getRemoveTask(idx)}
            >
              <TrashIcon className={clsx("h-4 w-4")} />
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
          onClick={addTask}
          type='button'
        >
          Ajouter une tache
        </Button>
      </div>
    </div>
  );
};
