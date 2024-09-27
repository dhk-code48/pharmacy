"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types/data-table";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const DataTableFacetedFilter = dynamic(() => import("./DataTableFacetedFilter").then((mod) => mod.DataTableFacetedFilter), {
  ssr: false,
  loading: () => <Skeleton className="w-10 h-5" />,
});
const DataTableViewOptions = dynamic(() => import("./DataTableViewOption").then((mod) => mod.DataTableViewOptions), {
  ssr: false,
  loading: () => <Skeleton className="w-10 h-5" />,
});

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
}

export default function DataTableToolbar<TData>({ table, filterableColumns = [], searchableColumns = [] }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap flex-1 items-center gap-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <Input
                  key={String(column.id)}
                  placeholder={column.placeholder}
                  value={(table.getColumn(String(column.id))?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn(String(column.id))?.setFilterValue(event.target.value)}
                  className="h-8 w-[150px] bg-background lg:w-[250px]"
                />
              )
          )}
        <div className="flex flex-wrap gap-2">
          {filterableColumns.length > 0 &&
            filterableColumns.map(
              (column) =>
                table.getColumn(column.id ? String(column.id) : "") && (
                  <DataTableFacetedFilter
                    key={String(column.id)}
                    // @ts-ignore
                    column={table.getColumn(column.id ? String(column.id) : "")}
                    title={column.title}
                    options={column.options}
                  />
                )
            )}
        </div>
        {isFiltered && (
          <Button aria-label="Reset filters" variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* @ts-ignore */}
      <DataTableViewOptions table={table} />
    </div>
  );
}
