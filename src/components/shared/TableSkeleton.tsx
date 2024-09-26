import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableHeader } from "../ui/table";

const TableSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 justify-between items-center">
        <Skeleton className="w-full h-10 max-w-sm" />
        <Skeleton className="w-20 h-10 rounded-xl" />
      </div>

      <Table className="space-y-2">
        <TableHeader>
          <Skeleton className="w-full h-10" />
        </TableHeader>
        <TableBody>
          <Skeleton className="w-full h-32" />
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
