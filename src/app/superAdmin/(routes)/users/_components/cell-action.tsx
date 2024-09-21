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
import { PaginatedUser } from "@/types";
import { Icons } from "@/components/shared/Icons";
import { toast } from "sonner";
import verifyPharmacy from "@/actions/superadmin/verifyPharmacy";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserInfo from "@/components/layout/UserInfo";

export function CellAction({ user }: { user: PaginatedUser }) {
  const router = useRouter();

  async function onVerify() {
    // toast.promise(verifyPharmacy(user.id, user.userId), {
    //   loading: "Verifying Pharmacy...",
    //   success: "Pharmacy Verified Successfully!",
    //   error: "Unexpected Error, Try Again!",
    // });
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
          <DialogTrigger className="flex hover:bg-accent hover:text-accent-foreground cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm transition-colors justify-between w-full">
            View User
            <Icons.eye className="text-muted-foreground size-5" />
          </DialogTrigger>
          <DialogContent>
            <UserInfo user={user} />
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
