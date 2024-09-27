"use client";

import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserInfo from "@/components/layout/UserInfo";
import { PaginatedReview } from "@/types";

export default function CellAction({ order: review }: { order: PaginatedReview }) {
  return (
    <DropdownMenuContent align="end" className="w-screen max-w-[12rem]">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <Dialog>
        <DialogTrigger className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground">
          User Info
        </DialogTrigger>
        <DialogContent>
          <UserInfo user={review.user} addresses={review.user.address} />
        </DialogContent>
      </Dialog>
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  );
}
