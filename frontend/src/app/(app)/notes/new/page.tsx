"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import useCreateNote from "@/hooks/notes/useCreateNote";
import { CreateNoteRequest } from "@/types/notes.type";
import { useForm, useWatch } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { useRef } from "react";
import NoteTagsList from "@/components/notes/note-tags-list";
import { Spinner } from "@/components/ui/spinner";
import ColorPicker from "@/components/common/colorpicker";
import { useRouter } from "next/navigation";

export default function NewNote() {
  const router = useRouter();

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<CreateNoteRequest>();
  const { mutateAsync, isPending, isError } = useCreateNote();

  const tagInputRef = useRef<HTMLInputElement | null>(null);

  const color = useWatch({
    control,
    name: "color"
  });

  const content = useWatch({
    control,
    name: "content",
    defaultValue: ""
  });

    const tags = useWatch({
    control,
    name: "tags",
    defaultValue: [],
  });

    const handleAddTag = () => {
    if (!tags) return;

    const inputTagVal = tagInputRef.current?.value;

    if (!inputTagVal) return;

    if (!inputTagVal.length) return;

    if (tags.includes(inputTagVal)) return;

    setValue("tags", [...tags, inputTagVal], {
      shouldDirty: true,
    });

    if (tagInputRef.current) tagInputRef.current.value = "";
  };

  const removeTag = (tag: string) => {
    if (!tags) return;

    setValue(
      "tags",
      tags.filter(t => t !== tag),
      { shouldDirty: true }
    );
  }

  const handleOnSubmit = async (data: CreateNoteRequest) => {
    try {
      await mutateAsync(data, { onSuccess: () => router.push("/notes") });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Create a new note</h1>

      <form className="flex flex-col w-full md:max-w-2xl gap-10" onSubmit={(e) => handleSubmit(handleOnSubmit)(e)}>
        <FieldGroup>
          <Field data-invalid={isError || !!errors.title?.message} >
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

          <Field data-invalid={isError || !!errors.content?.message} >
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <Textarea
              aria-invalid={isError || !!errors.content?.message}
              {...register("content", {
                maxLength: {
                  value: 255,
                  message: "Content cannot exceed 255 characters"
                }
              })}
              id="content"
            />

            <FieldDescription className="text-end">
              <span 
                style={{ color: content.length > 255 ? "var(--destructive)" : undefined }}
              >
                {content.length}/255
              </span>
            </FieldDescription>
          </Field>

          <Field data-invalid={isError}>
            <FieldLabel>Tags</FieldLabel>
            <InputGroup>
              <InputGroupInput
                ref={tagInputRef}
                type="text"
              />

              <InputGroupAddon align="inline-end">
                <InputGroupButton onClick={handleAddTag}>
                  Add <HugeiconsIcon icon={PlusSignIcon} />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>

            <FieldDescription>
              <NoteTagsList tags={tags ?? []} removeTag={removeTag} />
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Color</FieldLabel>
            <ColorPicker
              color={color}
              setColor={(newColor) => setValue("color", newColor)}
            />
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