"use client";

import * as React from "react";
import { type ColumnDef, type Table as TanstackTable, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolBar";
import type { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/useMediaQuery"; // A custom hook for detecting screen size

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  table: TanstackTable<TData>;
  totalRows: number;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
};

export function DataTable<TData, TValue>({
  columns,
  table,
  totalRows,
  searchableColumns = [],
  filterableColumns = [],
}: DataTableProps<TData, TValue>) {
  const { isMobile } = useMediaQuery(); // Adjust the breakpoint as needed
  const data = table.getRowModel().rows.map((row) => row.original);

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} filterableColumns={filterableColumns} searchableColumns={searchableColumns} />

      {/* Render cards on mobile */}
      {isMobile ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <Card key={row.id}>
                <CardHeader>
                  <CardTitle>{flexRender(row.getVisibleCells()[0].column.columnDef.cell, row.getVisibleCells()[0].getContext())}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {row.getVisibleCells().map((cell, index) => {
                    if (index === 0) return null; // Skip first cell (used in CardTitle)

                    // Render the column header name instead of flexRender
                    const columnHeader = typeof cell.column.columnDef.header === "string" ? cell.column.columnDef.header : null;

                    return (
                      <div key={cell.id} className="text-sm flex flex-wrap items-center gap-2">
                        {/* Use the column header string */}
                        {columnHeader && <strong>{columnHeader} : </strong>}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center">No results.</div>
          )}
        </div>
      ) : (
        // Render table on larger screens
        <div className="flex-shrink rounded-md border border-border bg-background">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <DataTablePagination table={table} totalRows={totalRows} />
    </div>
  );
}
