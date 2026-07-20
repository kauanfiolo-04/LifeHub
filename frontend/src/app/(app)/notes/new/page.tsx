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
import { useEffect, useRef, useState } from "react";
import NoteTagsList from "@/components/notes/note-tags-list";
import { Spinner } from "@/components/ui/spinner";
import ColorPicker from "@/components/common/colorpicker";
import { useRouter } from "next/navigation";

export default function NewNote() {
  const router = useRouter();

  const { register, handleSubmit, reset, setValue, control } = useForm<CreateNoteRequest>();
  const { mutateAsync, isPending, isError } = useCreateNote();

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

  const handleOnSubmit = async (data: CreateNoteRequest) => {
    try {
      const response = await mutateAsync(data);

      if (response.id) router.push("/notes");

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

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Create a new note</h1>

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
            />

          </Field>

          <Field data-invalid={isError} >
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <Textarea
              aria-invalid={isError}
              {...register("content")}
              id="content"
              required
            />
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
              <NoteTagsList tags={tags} setTags={setTags}/>
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