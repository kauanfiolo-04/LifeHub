"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { useForm, useWatch } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon } from "@hugeicons/core-free-icons";
import { useCallback, useEffect,  useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";
import NoteFormSkeleton from "@/components/notes/note-form-skeleton";
import { addNotification } from "@/utils/notifications";
import { useUpdateTask } from "@/hooks/tasks/useUpdateTask";
import { useDeleteTask } from "@/hooks/tasks/useDeleteTask";
import { useTask } from "@/hooks/tasks/useTask";
import { type Task, TaskPriority, TaskStatus, UpdateTaskRequest } from "@/types/tasks.type";
import SelectTaskEnum from "@/components/tasks/select-task-enum";
import { DatePicker } from "@/components/ui/date-picker";


export default function Task() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const { data: task, isPending: loadingTask } = useTask(id);

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<UpdateTaskRequest>();

  const { mutateAsync: updateTask, isPending: updatingTask, isError: updateError } = useUpdateTask();

  const { mutateAsync: deleteTask, isPending: deletingTask, isError: deleteError } = useDeleteTask();

  const [isEditing, setIsEditing] = useState(false);

  const description = useWatch({
    control,
    name: "description",
    defaultValue: ""
  });

  const status = useWatch({
    control,
    name: "status",
    defaultValue: TaskStatus.IN_PROGRESS
  });

  const priority = useWatch({
    control,
    name: "priority",
    defaultValue: TaskPriority.MEDIUM
  });

  const dueDate = useWatch({
    control,
    name: "dueDate",
    defaultValue: task?.dueDate
  });
  
  const handleStatus = (val: TaskStatus) => 
    setValue("status", val);

  const handlePriority = (val: TaskPriority) => 
    setValue("priority", val);

  const handleDate = (date?: Date) => 
    setValue("dueDate", date);

  const isError =
    deleteError || updateError;

  const isPending =
    updatingTask || deletingTask

  const resetTask = useCallback((task: Task) => {
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("status", task.status);
    setValue("priority", task.priority);
    setValue("dueDate", task.dueDate);
  }, [setValue]);

  const handleOnSubmit = async (data: UpdateTaskRequest) => {
    try {
      await updateTask({ id, data }, {
        onSuccess: () => {
          addNotification.success("Task created with success!")
          router.push("/tasks");
        },
        onError: () => addNotification.error("Try again later")
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteTask = async () => {
    try {
      await deleteTask({ id }, { 
        onSuccess: () => {
          router.replace("/tasks");
          addNotification.success("Task deleted with success!");
        },
        onError: () => addNotification.error("Try again later!")
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!task) return;

    resetTask(task);
  }, [task, resetTask]);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Note</h1>

      {loadingTask ? (
        <NoteFormSkeleton />
      ) : (
        <form className="flex flex-col w-full md:max-w-2xl gap-10" onSubmit={(e) => handleSubmit(handleOnSubmit)(e)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                className="md:h-8"
                aria-invalid={isError || !!errors.title?.message}
                {...register("title", {
                  maxLength: {
                    value: 100,
                    message: "Title cannot exceed 100 characters"
                  },
                  minLength: {
                    value: 5,
                    message: "Title must be longer than 5 characters"
                  }
                })}
                id="title"
                type="text"
                required
                readOnly={!isEditing}
              />

              {errors.title && (
                <FieldDescription>
                  {errors.title.message}
                </FieldDescription>
              )}
            </Field>

            <Field data-invalid={isError || !!errors.description?.message} >
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                aria-invalid={isError || !!errors.description?.message}
                {...register("description", {
                  maxLength: {
                    value: 500,
                    message: "description cannot exceed 500 characters"
                  }
                })}
                id="description"
                readOnly={!isEditing}
              />

              <FieldDescription className="text-end">
                <span
                  style={{ color: (description ?? "").length > 500 ? "var(--destructive)" : undefined }}
                >
                  {description?.length ?? 0}/500
                </span>
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Status</FieldLabel>
  
              <SelectTaskEnum<TaskStatus>
                items={TaskStatus}
                value={status}
                onSelect={handleStatus}
                readOnly={!isEditing}
              />
            </Field>

            <Field>
              <FieldLabel>Priority</FieldLabel>
  
              <SelectTaskEnum<TaskPriority>
                items={TaskPriority}
                value={priority}
                onSelect={handlePriority}
                readOnly={!isEditing}
              />
            </Field>
  
            <Field>
              <FieldLabel>Due date</FieldLabel>
  
              <DatePicker 
                value={dueDate}
                onChange={handleDate}
                readOnly={!isEditing}
              />
            </Field>

          </FieldGroup>

          {isEditing ? (
            <div className="flex w-full items-center gap-4">
              <Button
                size="lg"
                type="button"
                variant="destructive"
                className="w-[calc(25%-8px)]"
                onClick={() => {
                  setIsEditing(false);
                  if (task) resetTask(task);
                }}
              >
                Cancel
              </Button>

              <Button
                size="lg"
                disabled={isPending}
                type="submit"
                className="w-[calc(75%-8px)]"
              >
                {isPending ? (
                  <>
                    <Spinner /> Saving...
                  </>
                ) : "Save changes"}
              </Button>

            </div>
          ) : (
            <div className="flex flex-col w-full gap-2">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={() => setIsEditing(true)}
              >
                <HugeiconsIcon icon={Edit02Icon} className="mr-2 w-3.5! h-3.5!" size={14} /> Edit
              </Button>

              <Button
                size="lg"
                type="button"
                variant="destructive"
                onClick={handleDeleteTask}
              >
                Delete task
              </Button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
