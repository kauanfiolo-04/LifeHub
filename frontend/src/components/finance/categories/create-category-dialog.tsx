"use client";

import ColorPicker from "@/components/common/colorpicker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useCreateCategory from "@/hooks/finance/categories/useCreateCategory";
import { CreateCategoryRequest } from "@/types/finance/categories.type";
import { getErrorMessage } from "@/utils/get-error-message";
import { addNotification } from "@/utils/notifications";
import { useForm, useWatch } from "react-hook-form";

export default function CreateCategoryDialog() {
  const { mutateAsync, isPending, isError, reset } = useCreateCategory();
  
  const { register, setValue, handleSubmit, control } = useForm<CreateCategoryRequest>();

  const color = useWatch({
    control,
    name: "color",
    defaultValue: undefined
  });

  const handleColor = (color?: string) => 
    setValue("color", color);

  const handleOnSubmit = async (data: CreateCategoryRequest) => {
    try {
      await mutateAsync(data, { 
        onSuccess: () => {
          addNotification.success("Category created with success!")
        }, 
        onError: (e) => {
          const message = getErrorMessage(e);
          addNotification.error(Array.isArray(message) ? message.join(", ") : message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>Create new category</DialogHeader>

        <form 
          onSubmit={(e) => {
            e.stopPropagation();
            handleSubmit(handleOnSubmit)(e);
          }}
        >
          <FieldGroup>
            <Field aria-invalid={isError}>
              <FieldLabel>Name</FieldLabel>

              <Input 
                aria-invalid={isError}
                {...register("name", { 
                  onChange: () => reset(),
                  minLength: {
                    message: "Name must be longer than 2 characters.",
                    value: 2
                  },
                  maxLength: {
                    message: "Name must be shorte than 100 characters",
                    value: 100
                  },
                  required: true
                })}
              />
            </Field>

            <Field>
              <FieldLabel>Color</FieldLabel>

              <ColorPicker 
                color={color}
                setColor={handleColor}
              />
            </Field>

            <Button className="w-full" disabled={isPending} type="submit">
              {isPending ? (
                <>
                  <Spinner /> Creating...
                </>
              ) : "Create"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}