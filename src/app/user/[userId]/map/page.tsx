"use client";

import { columns } from "@/components/data-table/columns";
import { data, filterFields } from "@/components/data-table/constants";
import { DataTable } from "@/components/data-table/data-table";
import { columnFilterSchema } from "@/components/data-table/schema";
import { useEffect } from "react";

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const search = columnFilterSchema.safeParse(searchParams);

  useEffect(() => {
    fetch(`/api/views?slug=${"data-table"}`, { method: "POST" });
  }, []);

  if (!search.success) {
    console.log(search.error);
    return null;
  }

  return (
    <div className="max-w-sm md:max-w-full w-full overflow-hidden max-auto">
      <DataTable
        columns={columns}
        data={data}
        filterFields={filterFields}
        defaultColumnFilters={Object.entries(search.data).map(([key, value]) => ({
          id: key,
          value,
        }))}
      />
    </div>
  );
}
