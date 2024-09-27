import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { type Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import type { Option } from "@/types/data-table";

interface FilterContentProps<TData, TValue> {
  title?: string;
  options: Option[];
  selectedValues: Set<string>;
  column?: Column<TData, TValue>;
  onClose: () => void;
}

export default function FilterContent<TData, TValue>({ title, options, selectedValues, column, onClose }: FilterContentProps<TData, TValue>) {
  return (
    <Command>
      <CommandInput placeholder={title} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => {
            const isSelected = selectedValues.has(option.value.toString());
            return (
              <CommandItem
                key={option.value.toString()}
                onSelect={() => {
                  if (isSelected) {
                    selectedValues.delete(option.value.toString());
                  } else {
                    selectedValues.add(option.value.toString());
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(filterValues.length ? filterValues : undefined);
                }}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <CheckIcon className={cn("h-4 w-4")} />
                </div>
                {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                <span>{option.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        {selectedValues.size > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  column?.setFilterValue(undefined);
                  onClose();
                }}
                className="justify-center text-center"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}
