import { InformationCircleIcon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "../ui/input-group";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import NoteTagsList from "./note-tags-list";
import { useIsMobile } from "@/hooks/useMobile";
import { useRef } from "react";
import { UseFormSetValue } from "react-hook-form";
import { CreateNoteRequest } from "@/types/notes.type";

interface NoteTagFieldProps {
  tags: string[] | undefined;
  isError: boolean;
  readOnly?: boolean;
  setValue: UseFormSetValue<CreateNoteRequest> | UseFormSetValue<Partial<CreateNoteRequest>>;
}

export default function NoteTagField({ tags, isError, readOnly = false, setValue }: NoteTagFieldProps) {
  const isMobile = useIsMobile();

  const tagInputRef = useRef<HTMLInputElement | null>(null);

  const addTag = () => {
    if (!tags) return;

    const inputTagVal = tagInputRef.current?.value.trim().toLowerCase();

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

  return (
    <Field data-invalid={isError}>
      <FieldLabel htmlFor="tag">
        Tags

        {isMobile ? (
          <Popover>
            <PopoverTrigger asChild className="w-fit">
              <Button variant="ghost" size="icon" type="button">
                <HugeiconsIcon icon={InformationCircleIcon} size={12} />
              </Button>
            </PopoverTrigger>

            <PopoverContent side="top" align="center" className="w-max">
              <p>To remove a tag, <br /> just click on it.</p>
            </PopoverContent>
          </Popover>
        ) : (
          <Tooltip>
            <TooltipTrigger type="button">
              <HugeiconsIcon icon={InformationCircleIcon} size={12} />
            </TooltipTrigger>

            <TooltipContent>
              <p>To remove a tag, just click on it.</p>
            </TooltipContent>
          </Tooltip>
        )}
      </FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="tag"
          ref={tagInputRef}
          type="text"
          readOnly={readOnly}
          onChange={(e) => {
            e.target.value = e.target.value.toLowerCase();
          }}
        />

        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={addTag}>
            Add <HugeiconsIcon icon={PlusSignIcon} />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <FieldDescription>
        <NoteTagsList tags={tags ?? []} removeTag={removeTag} />
      </FieldDescription>
    </Field>
  );
}