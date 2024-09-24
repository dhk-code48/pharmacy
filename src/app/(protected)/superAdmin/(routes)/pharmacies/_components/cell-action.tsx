"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { PaginatedPharmacy } from "@/types";
import { Icons } from "@/components/shared/Icons";
import { toast } from "sonner";
import verifyPharmacy from "@/actions/superadmin/verifyPharmacy";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PharmacyInfo from "@/components/layout/PharmacyInfo";

export function CellAction({ pharmacy }: { pharmacy: PaginatedPharmacy }) {
  async function onVerify() {
    toast.promise(verifyPharmacy(pharmacy.id, pharmacy.userId), {
      loading: "Verifying Pharmacy...",
      success: "Pharmacy Verified Successfully!",
      error: "Unexpected Error, Try Again!",
    });
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
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
    </DropdownMenu>
  );
}
