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
import { useRouter } from "next/navigation";
import { PaginatedFeedBack } from "@/types";
import { Icons } from "@/components/shared/Icons";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserInfo from "@/components/layout/UserInfo";

export function CellAction({ feedback }: { feedback: PaginatedFeedBack }) {
  const router = useRouter();

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
          <DialogTrigger className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground">
            User Info
          </DialogTrigger>
          <DialogContent>
            <UserInfo user={feedback.user} />
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
