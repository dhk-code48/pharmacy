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
import { PaginatedPharmacy } from "@/types";
import { Icons } from "@/components/shared/Icons";
import { toast } from "sonner";
import verifyPharmacy from "@/actions/superadmin/verifyPharmacy";

export function CellAction({ pharmacy }: { pharmacy: PaginatedPharmacy }) {
  const router = useRouter();

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
        <DropdownMenuItem onClick={() => router.push(`/superAdmin/pharmacies/${pharmacy.id}`)}>
          View Pharmacy
          <DropdownMenuShortcut>
            <Icons.eye size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onVerify}>
          Verify Pharmacy
          <DropdownMenuShortcut>
            <Icons.check size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
