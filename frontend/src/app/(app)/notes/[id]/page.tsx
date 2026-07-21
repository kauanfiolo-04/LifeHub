"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import useCreateNote from "@/hooks/notes/useCreateNote";
import { UpdateNoteRequest } from "@/types/notes.type";
import { useForm, useWatch } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import NoteTagsList from "@/components/notes/note-tags-list";
import { Spinner } from "@/components/ui/spinner";
import ColorPicker from "@/components/common/colorpicker";
import { useParams } from "next/navigation";
import { useUpdateNote } from "@/hooks/notes/useUpdateNote";
import { useNote } from "@/hooks/notes/useNote";
import NoteFormSkeleton from "@/components/notes/note-form-skeleton";


export default function Note() {
  const { id } = useParams<{ id: string }>();

  const { data: note, isPending: loadingNote } = useNote(id);

  const { register, handleSubmit, setValue, control } = useForm<UpdateNoteRequest>();
  const { mutateAsync: update, isPending: updatingNote, isError } = useUpdateNote();

  const [isEditing, setIsEditing] = useState(false);

  const [tags, setTags] = useState<string[]>([]);

  const tagInputRef = useRef<HTMLInputElement | null>(null);

  const color = useWatch({
    control,
    name: "color"
  });

  const handleAddTag = () => {
    const inputTagVal = tagInputRef.current?.value;

    if (!inputTagVal) return;

    if (!inputTagVal.length) return;

    if (tags.includes(inputTagVal)) return;

    setTags(prev => [...prev, inputTagVal]);
  };

  const handleOnSubmit = async (data: UpdateNoteRequest) => {
    try {
      // const response = await mutateAsync(data);

      // if (response.id) router.push("/notes");

      // reset();

      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setValue("tags", tags);

    const inputTag = tagInputRef.current;

    if (!inputTag) return;

    inputTag.value = "";
  }, [tags, setValue]);

  useEffect(() => {
    if (!note) return;

    setValue("title", note.title);
    setValue("content", note.content);
    setValue("color", note.color);
    setValue("tags", note.tags);
    setValue("title", note.title);
  }, [note, setValue]);

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
            <Button size="lg" disabled={updatingNote} type="submit">
              {updatingNote ? (
                <>
                  <Spinner /> Saving...
                </>
              ) : "Save changes"}
            </Button>
          ) : (
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => setIsEditing(true)}
            >
              <HugeiconsIcon icon={Edit02Icon} className="mr-2 w-3.5! h-3.5!" size={14} /> Editar
            </Button>
          )}
        </form>
      )}
    </div>
  );
}