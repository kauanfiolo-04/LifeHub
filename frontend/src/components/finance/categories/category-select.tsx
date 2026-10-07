import CreateCategoryDialog from "./create-category-dialog";
import { Category } from "@/types/finance/categories.type";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatToLabel } from "@/utils/format-to-label";

interface CategorySelectProps {
  categories: Category[];
  category: Category | undefined;
  setCategory: (cat: Category) => void;
}

export default function CategorySelect({ categories, category, setCategory }: CategorySelectProps) {
  return (
    <div className="flex gap-2 w-full">
      <Select
        defaultValue="select"
        onValueChange={(val) => {
          const cat = categories.find(item => item.name.toLowerCase() === val);

          if (cat) setCategory(cat);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="select" disabled>
              Select category
            </SelectItem>

            {categories.map(cat => (
              <SelectItem 
                key={cat.id}
                value={cat.name.toLowerCase()}
              >
                {formatToLabel(cat.name)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <CreateCategoryDialog />
    </div>
  );
}