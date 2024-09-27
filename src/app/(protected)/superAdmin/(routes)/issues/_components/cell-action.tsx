"use client";

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";

import { SuperAdminPaginatedOrderIssue } from "@/types";
import { Icons } from "@/components/shared/Icons";
import { toast } from "sonner";
import verifyPharmacy from "@/actions/superadmin/verifyPharmacy";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PharmacyInfo from "@/components/layout/PharmacyInfo";
import UserInfo from "@/components/layout/UserInfo";

export default function CellAction({ issues }: { issues: SuperAdminPaginatedOrderIssue }) {
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
          <PharmacyInfo pharmacy={issues.pharmacy} />
        </DialogContent>
      </Dialog>

      <DropdownMenuSeparator />

      <Dialog>
        <DialogTrigger className="flex justify-between cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground">
          View User
          <Icons.eye className="text-muted-foreground size-4" />
        </DialogTrigger>
        <DialogContent>
          <UserInfo user={issues.user} addresses={[]} />
        </DialogContent>
      </Dialog>
    </DropdownMenuContent>
  );
}
