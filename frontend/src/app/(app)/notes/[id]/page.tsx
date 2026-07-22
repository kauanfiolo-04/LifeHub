"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { type Note, UpdateNoteRequest } from "@/types/notes.type";
import { useForm, useWatch } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import NoteTagsList from "@/components/notes/note-tags-list";
import { Spinner } from "@/components/ui/spinner";
import ColorPicker from "@/components/common/colorpicker";
import { useParams, useRouter } from "next/navigation";
import { useUpdateNote } from "@/hooks/notes/useUpdateNote";
import { useNote } from "@/hooks/notes/useNote";
import NoteFormSkeleton from "@/components/notes/note-form-skeleton";
import { useDeleteNote } from "@/hooks/notes/useDeleteNote";


export default function Note() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const { data: note, isPending: loadingNote } = useNote(id);

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<UpdateNoteRequest>();

  const { mutateAsync: updateNote, isPending: updatingNote, isError: updateError } = useUpdateNote();

  const { mutateAsync: deleteNote, isPending: deletingNote, isError: deleteError } = useDeleteNote();

  const [isEditing, setIsEditing] = useState(false);

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

  const isError =
    deleteError || updateError;

  const isPending =
    updatingNote || deletingNote

  const resetNote = useCallback((note: Note) => {
    setValue("title", note.title);
    setValue("content", note.content);
    setValue("color", note.color);
    setValue("tags", note.tags);
    setValue("title", note.title);
  }, [setValue]);

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

  const handleOnSubmit = async (data: UpdateNoteRequest) => {
    try {
      await updateNote({ id, data }, { onSuccess: () => setIsEditing(false) });
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteNote = async () => {
    try {
      await deleteNote({ id }, { onSuccess: () => router.replace("/notes") });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!note) return;

    console.log("note: ", note)

    resetNote(note);
  }, [note, resetNote]);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Note</h1>

      {loadingNote ? (
        <NoteFormSkeleton />
      ) : (
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
                readOnly={!isEditing}
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
                required
                readOnly={!isEditing}
              />

              <FieldDescription className="text-end">
                <span
                  style={{ color: content ? (content.length > 255 ? "var(--destructive)" : undefined) : undefined }}
                >
                  {content?.length ?? 0}/255
                </span>
              </FieldDescription>
            </Field>

            <Field data-invalid={isError}>
              <FieldLabel>Tags</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  ref={tagInputRef}
                  type="text"
                  readOnly={!isEditing}
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
                  if (note) resetNote(note);
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
                onClick={handleDeleteNote}
              >
                Delete note
              </Button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}