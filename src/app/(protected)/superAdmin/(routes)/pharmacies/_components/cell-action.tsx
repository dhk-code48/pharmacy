"use client";

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";

import { PaginatedPharmacy } from "@/types";
import { Icons } from "@/components/shared/Icons";
import { toast } from "sonner";
import verifyPharmacy from "@/actions/superadmin/verifyPharmacy";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PharmacyInfo from "@/components/layout/PharmacyInfo";

export default function CellAction({ pharmacy }: { pharmacy: PaginatedPharmacy }) {
  async function onVerify() {
    toast.promise(verifyPharmacy(pharmacy.id, pharmacy.userId), {
      loading: "Verifying Pharmacy...",
      success: "Pharmacy Verified Successfully!",
      error: "Unexpected Error, Try Again!",
    });
  }

  return (
    <DropdownMenuContent align="end" className="w-screen max-w-[12rem]">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <Dialog>
        <DialogTrigger className="flex justify-between cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground">
          View Pharmacy
          <Icons.eye className="text-muted-foreground size-4" />
        </DialogTrigger>
        <DialogContent>
          <PharmacyInfo pharmacy={pharmacy} />
        </DialogContent>
      </Dialog>

      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onVerify}>
        Verify Pharmacy
        <DropdownMenuShortcut>
          <Icons.verified className="size-4" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
