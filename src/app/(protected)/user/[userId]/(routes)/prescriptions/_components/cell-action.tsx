import { DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Media, Prescription } from "@prisma/client";
import { DropdownMenuContent, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import PrescriptionImages from "@/components/layout/PrescriptionImages";
import { Icons } from "@/components/shared/Icons";
import { toast } from "sonner";
import deletePrescription from "@/actions/user/deletePrescription";

const CellAction = ({ prescription }: { prescription: Prescription & { images: Media[] } }) => {
  async function onDelete(id: number) {
    const isDelete = confirm("Do you really want to delete this prescription");
    if (isDelete) {
      toast.promise(deletePrescription(id), {
        loading: "Deleting Prescription...",
        success: "Successfully deleted Prescription",
        error: "Prescription cannot be deleted, if linked to order",
      });
    }
  }

  return (
    <DropdownMenuContent align="end" className="w-full max-w-[12rem]">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <Dialog>
        <DialogTrigger
          className={cn(
            "relative w-full justify-between hover:bg-accent hover:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground"
          )}
        >
          View
          <Icons.eye className="text-muted-foreground" size={18} />
        </DialogTrigger>
        <DialogContent>
          <PrescriptionImages images={prescription.images} />
        </DialogContent>
      </Dialog>

      <DropdownMenuItem className="text-red-600 bg-destructive/30" onClick={() => onDelete(prescription.id)}>
        Remove
        <DropdownMenuShortcut>
          <Icons.delete size={18} />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default CellAction;
