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

  const { register, handleSubmit, setValue, control } = useForm<UpdateNoteRequest>();

  const { mutateAsync: updateNote, isPending: updatingNote, isError: updateError } = useUpdateNote();

  const { mutateAsync: deleteNote, isPending: deletingNote, isError: deleteError } = useDeleteNote();

  const [isEditing, setIsEditing] = useState(false);

  const [tags, setTags] = useState<string[]>([]);

  const tagInputRef = useRef<HTMLInputElement | null>(null);

  const color = useWatch({
    control,
    name: "color"
  });

  const isError = 
    deleteError || updateError;

  const isPending = 
    updateNote || deletingNote

  const resetNote = useCallback((note: Note) => {
    setValue("title", note.title);
    setValue("content", note.content);
    setValue("color", note.color);
    setValue("tags", note.tags);
    setValue("title", note.title);
  }, [setValue]);

  const handleAddTag = () => {
    const inputTagVal = tagInputRef.current?.value;

    if (!inputTagVal) return;

    if (!inputTagVal.length) return;

    if (tags.includes(inputTagVal)) return;

    setTags(prev => [...prev, inputTagVal]);
  };

  const handleOnSubmit = async (data: UpdateNoteRequest) => {
    try {
      const response = await updateNote({ id, data });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteNote = async () => {
    try {
      const response = await deleteNote({ id });

      router.replace("/notes");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValue("tags", tags);

    const inputTag = tagInputRef.current;

    if (!inputTag) return;

    inputTag.value = "";
  }, [tags, setValue]);

  useEffect(() => {
    if (!note) return;

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
            <Field data-invalid={isError} >
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                className="md:h-8"
                aria-invalid={isError}
                {...register("title")}
                id="title"
                type="text"
                required
                readOnly={!isEditing}
              />

            </Field>

            <Field data-invalid={isError} >
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <Textarea
                aria-invalid={isError}
                {...register("content")}
                id="content"
                required
                readOnly={!isEditing}
              />
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
                <NoteTagsList tags={tags} setTags={setTags} />
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
                disabled={updatingNote}
                type="submit"
                className="w-[calc(75%-8px)]"
              >
                {updatingNote ? (
                  <>
                    <Spinner /> Saving...
                  </>
                ) : "Save changes"}
              </Button>

            </div>
          ) : (
            <div className="flex flex-col w-full gap-2">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setIsEditing(true)}
              >
                <HugeiconsIcon icon={Edit02Icon} className="mr-2 w-3.5! h-3.5!" size={14} /> Edit
              </Button>

              <Button
                size="lg"
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