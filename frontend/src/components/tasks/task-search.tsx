import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { ButtonGroup } from "../ui/button-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
interface TaskSearchProps {
  onSearch: ({ search }: { search: string }) => void;
  searchValue?: string;
}

export default function TaskSearch({ searchValue, onSearch }: TaskSearchProps) {
  const { register, handleSubmit } = useForm<{ search: string }>();

  return (
    <form onSubmit={(e) => handleSubmit(onSearch)(e)} className="w-full">
      <ButtonGroup className="w-full md:min-w-2xl">
        <Input
          {...register("search", { 
            value: searchValue
          })}
        />

        <Button variant="outline">
          <HugeiconsIcon icon={Search01Icon}/>
        </Button>
      </ButtonGroup>
    </form>
  );
}