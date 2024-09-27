import React from "react";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

interface PageNavigationProps<TData> {
  table: Table<TData>;
}

export default function PageNavigation<TData>({ table }: PageNavigationProps<TData>) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        aria-label="Go to first page"
        variant="outline"
        className="hidden size-8 p-0 lg:flex"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label="Go to previous page"
        variant="outline"
        className="size-8 p-0"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon className="size-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label="Go to next page"
        variant="outline"
        className="size-8 p-0"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon className="size-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label="Go to last page"
        variant="outline"
        className="hidden size-8 p-0 lg:flex"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
