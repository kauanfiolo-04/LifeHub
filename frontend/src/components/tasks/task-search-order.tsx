import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { ButtonGroup } from "../ui/button-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterMailIcon, Search01Icon, Sorting05Icon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import TasksFilterList from "./tasks-filter-list";

interface TaskSearchOrderProps {
  onSearch: ({ search }: { search: string }) => void;
  searchValue?: string;
  isMobile: boolean;
  checkFilter: (value: string) => void;
}

export default function TaskSearchOrder({ searchValue, onSearch, isMobile, checkFilter }: TaskSearchOrderProps) {
  const { register, handleSubmit } = useForm<{ search: string }>();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <form onSubmit={(e) => handleSubmit(onSearch)(e)}>
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

      <div className="w-full gap-4 flex">
        <Button variant="outline" className="gap-2 md:w-26 w-[calc(50%-8px)]">
          <span>Order</span>

          <HugeiconsIcon icon={Sorting05Icon} />
        </Button>

        {isMobile && (
          <Drawer direction="left" fixed >
            <DrawerTrigger asChild>
              <Button variant="outline" className="gap-2 w-[calc(50%-8px)]">
                <span>Filters</span>

                <HugeiconsIcon icon={FilterMailIcon} />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <TasksFilterList 
                checkFilter={checkFilter}
                isMobile={isMobile}
              />
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
} 