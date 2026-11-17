import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PageItem = number | "ellipsis-start" | "ellipsis-end";

function getPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  const items: PageItem[] = [1];
  if (start > 2) items.push("ellipsis-start");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("ellipsis-end");
  items.push(total);

  return items;
}

interface ListPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function ListPagination({
  page,
  totalPages,
  onPageChange,
  disabled = false,
}: ListPaginationProps) {
  if (totalPages <= 1) return null;

  const isFirst = page === 1;
  const isLast = page >= totalPages;

  const go = (target: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled || target < 1 || target > totalPages || target === page) return;
    onPageChange(target);
    window.scrollTo({ top: 0, behavior: "smooth" })
  };

  const disabledProps = (isDisabled: boolean) =>
    isDisabled
      ? { "aria-disabled": true, tabIndex: -1, className: "pointer-events-none opacity-50" }
      : {};

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={go(page - 1)} {...disabledProps(isFirst)} />
        </PaginationItem>

        {getPageItems(page, totalPages).map((item) =>
          typeof item === "number" ? (
            <PaginationItem key={item}>
              <PaginationLink href="#" isActive={item === page} onClick={go(item)}>
                {item}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext href="#" onClick={go(page + 1)} {...disabledProps(isLast || disabled)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}