"use client";

import SelectTaskEnum from "@/components/tasks/select-task-enum";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import { CreateTaskRequest, TaskPriority, TaskStatus } from "@/types/tasks.type";
import { addNotification } from "@/utils/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";

export default function TasksPage() {
  const router = useRouter();

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<CreateTaskRequest>();

  const { mutateAsync, isPending, isError } = useCreateTask();

  const now = useMemo(() => new Date(), []);

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
    defaultValue: now
  });

  const handleStatus = (val: TaskStatus) => 
    setValue("status", val);

  const handlePriority = (val: TaskPriority) => 
    setValue("priority", val);

  const handleDate = (date?: Date) => 
    setValue("dueDate", date);

  const handleOnSubmit = async (data: CreateTaskRequest) => {
    try {
      await mutateAsync(data, {
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

  useEffect(() => {
    setValue("status", TaskStatus.IN_PROGRESS);
    setValue("dueDate", now);
  }, [setValue, now])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">New Task</h1>

      <form className="flex flex-col w-full md:max-w-xl gap-10 mx-auto" onSubmit={(e) => handleSubmit(handleOnSubmit)(e)}>
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
                }
              })}
              id="title"
              type="text"
              required
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
            />
          </Field>

          <Field>
            <FieldLabel>Priority</FieldLabel>

            <SelectTaskEnum<TaskPriority>
              items={TaskPriority}
              value={priority}
              onSelect={handlePriority}
            />
          </Field>

          <Field>
            <FieldLabel>Due date</FieldLabel>

            <DatePicker value={dueDate} onChange={handleDate} />
          </Field>

        </FieldGroup>

        <Button size="lg" disabled={isPending} type="submit">
          {isPending ? (
            <>
              <Spinner /> Creating...
            </>
          ) : "Create"}
        </Button>
      </form>
    </div>
  );
}