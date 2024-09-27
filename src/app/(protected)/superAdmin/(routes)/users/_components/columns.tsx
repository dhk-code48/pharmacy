"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { formatDate } from "@/lib/format";
import { CldImage } from "next-cloudinary";
import { PaginatedUser } from "@/types";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserAvatar } from "@/components/shared/UserAvatar";

export function getColumns(): ColumnDef<PaginatedUser>[] {
  return columns;
}

export const columns: ColumnDef<PaginatedUser>[] = [
  {
    accessorKey: "image",
    header: "Profile",
    cell: ({ row }) => {
      return (
        <>
          <UserAvatar name={row.original.name} image={row.original.image} />
        </>
      );
    },
  },
  {
    accessorKey: "name",
    header: "User",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.createdAt, "DD-DDDD-MMMM-YYYY")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction user={row.original} />,
  },
];
