"use client";

import React from "react";
import dynamic from "next/dynamic";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

const PageSizeSelector = dynamic(() => import("./PaginationPageSizeSelector"));
const PageNavigation = dynamic(() => import("./PaginationPageNavigator"));

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  totalRows: number;
}

export default function DataTablePagination<TData>({ table, pageSizeOptions = [10, 20, 30, 40, 50], totalRows }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
      <p className="flex-1 text-sm text-muted-foreground">
        {totalRows}
        <span className="inline">&nbsp;result(s) found</span>
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        {/* @ts-ignore */}
        <PageSizeSelector table={table} pageSizeOptions={pageSizeOptions} />
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        {/* @ts-ignore */}
        <PageNavigation table={table} />
      </div>
    </div>
  );
}
