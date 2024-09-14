"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { default as InvoiceUi } from "@/components/shared/Invoice";
import { PaginatedOrder } from "@/types";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/Icons";

export function CellAction({ order }: { order: PaginatedOrder }) {
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
        <DropdownMenuItem onClick={() => router.push(`/user/${order.userId}/orders/${order.id}`)}>
          View Order
          <DropdownMenuShortcut>
            <Icons.eye size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <Dialog>
          <DialogTrigger
            disabled={order.invoice ? false : true}
            className={cn(
              "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
              !order.invoice && "!pointer-events-none !opacity-50"
            )}
          >
            View Invoice
          </DialogTrigger>
          <DialogContent className="max-w-screen-xl">
            {order.invoice && <InvoiceUi invoice={order.invoice} order={order} pharmacy={order.pharmacy} />}
          </DialogContent>
        </Dialog>

        <DropdownMenuItem className="text-red-600">Remove Order</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
