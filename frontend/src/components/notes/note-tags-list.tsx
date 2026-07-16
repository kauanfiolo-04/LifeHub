import { Dispatch, SetStateAction } from "react";

interface NoteTagsListProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

export default function NoteTagsList({ tags, setTags }: NoteTagsListProps) {
  const handleDeleteTag = (tag: string) => {
    setTags(prev => prev.filter(str => str !== tag));
  }

  return tags.map((tag, idx, self) => (
    <span
      key={tag}
      className="hover:line-through hover:text-destructive cursor-pointer"
      onClick={() => handleDeleteTag(tag)}
    >
      {idx === (self.length - 1) ? tag : `${tag}, `}
    </span>
  ));
}