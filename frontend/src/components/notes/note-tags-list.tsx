interface NoteTagsListProps {
  tags: string[];
  removeTag: (tag: string) => void;
}

export default function NoteTagsList({ tags, removeTag }: NoteTagsListProps) {
  return tags.map((tag, idx, self) => (
    <span
      key={`${tag}-${idx}`}
      className="hover:line-through hover:text-destructive cursor-pointer"
      onClick={() => removeTag(tag)}
    >
      {idx === (self.length - 1) ? tag : `${tag}, `}
    </span>
  ));
}