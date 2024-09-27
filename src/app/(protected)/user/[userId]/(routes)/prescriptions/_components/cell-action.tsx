import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Media, Prescription } from "@prisma/client";
import React from "react";
import dynamic from "next/dynamic";

const ViewDialog = dynamic(() => import("./prescription-dialog"), {
  loading: () => <p>Loading...</p>,
});

const DeleteMenuItem = dynamic(() => import("./remove-dialog"), {
  loading: () => <p>Loading...</p>,
});

export default function CellAction({ prescription }: { prescription: Prescription & { images: Media[] } }) {
  return (
    <DropdownMenuContent align="end" className="w-full max-w-[12rem]">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <ViewDialog prescription={prescription} />
      <DeleteMenuItem prescriptionId={prescription.id} />
    </DropdownMenuContent>
  );
}
