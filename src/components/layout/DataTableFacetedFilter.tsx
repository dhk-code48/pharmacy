"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { type Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { Option } from "@/types/data-table";

const PopoverContent = dynamic(() => import("@/components/ui/popover").then((mod) => mod.PopoverContent));
const FilterContent = dynamic(() => import("./DataTableFilterContent"));

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Option[];
}

export function DataTableFacetedFilter<TData, TValue>({ column, title, options }: DataTableFacetedFilterProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && <SelectedFilters selectedValues={selectedValues} options={options} />}
        </Button>
      </PopoverTrigger>
      {open && (
        <PopoverContent className="w-[200px] p-0" align="start">
          {/* @ts-ignore */}
          <FilterContent title={title} options={options} selectedValues={selectedValues} column={column} onClose={() => setOpen(false)} />
        </PopoverContent>
      )}
    </Popover>
  );
}

function SelectedFilters({ selectedValues, options }: { selectedValues: Set<string>; options: Option[] }) {
  return (
    <>
      <Separator orientation="vertical" className="mx-2 h-4" />
      <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
        {selectedValues.size}
      </Badge>
      <div className="hidden space-x-1 lg:flex">
        {selectedValues.size > 2 ? (
          <Badge variant="secondary" className="rounded-sm px-1 font-normal">
            {selectedValues.size} selected
          </Badge>
        ) : (
          options
            .filter((option) => selectedValues.has(option.value.toString()))
            .map((option, index) => (
              <Badge variant="secondary" key={`selected-filter-${index}`} className="rounded-sm px-1 font-normal">
                {option.label}
              </Badge>
            ))
        )}
      </div>
    </>
  );
}

export default DataTableFacetedFilter;
