"use client";

import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { PaginatedFeedBack } from "@/types";
import { Icons } from "@/components/shared/Icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserInfo from "@/components/layout/UserInfo";
import FeedBackInfo from "@/components/layout/FeedBackInfo";

export default function CellAction({ feedback }: { feedback: PaginatedFeedBack }) {
  return (
    <DropdownMenuContent align="end" className="w-screen max-w-[12rem]">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>

      <DropdownMenuSeparator />
      <Dialog>
        <DialogTrigger className="flex justify-between cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground">
          Review Feedback
          <Icons.message className="text-muted-foreground size-4" />
        </DialogTrigger>
        <DialogContent>
          <FeedBackInfo feedback={feedback} />
        </DialogContent>
      </Dialog>
      <DropdownMenuSeparator />
      <Dialog>
        <DialogTrigger className="flex justify-between cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground">
          User Info
          <Icons.eye className="text-muted-foreground size-4" />
        </DialogTrigger>
        <DialogContent>
          <UserInfo user={feedback.user} addresses={feedback.user.address} />
        </DialogContent>
      </Dialog>

      <DropdownMenuSeparator />
    </DropdownMenuContent>
  );
}
