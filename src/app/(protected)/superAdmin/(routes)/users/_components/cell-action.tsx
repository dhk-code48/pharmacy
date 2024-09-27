"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { PaginatedUser } from "@/types";
import { Icons } from "@/components/shared/Icons";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserInfo from "@/components/layout/UserInfo";

export function CellAction({ user }: { user: PaginatedUser }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Icons.moreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-screen max-w-[12rem]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <Dialog>
          <DialogTrigger className="flex hover:bg-accent hover:text-accent-foreground cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm transition-colors justify-between w-full">
            View User
            <Icons.eye className="text-muted-foreground size-5" />
          </DialogTrigger>
          <DialogContent>
            <UserInfo addresses={user.address} user={user} />
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
