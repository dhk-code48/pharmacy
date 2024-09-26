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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { default as InvoiceUi } from "@/components/shared/Invoice";
import { PaginatedUserOrder } from "@/types";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/Icons";
import cancelOrder from "@/actions/user/cancelOrder";

export default function CellAction({ order }: { order: PaginatedUserOrder }) {
  const router = useRouter();
  async function onCancel(id: number) {
    const isDelete = confirm("Do you really want to cancel this order");
    if (isDelete) {
      toast.promise(cancelOrder(id), {
        loading: "Canceling Order...",
        success: "Successfully canceled Order",
        error: "Order cannot be canceled",
      });
    }
  }

  return (
    <DropdownMenuContent align="end" className="w-screen max-w-[12rem]">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>

      <DropdownMenuSeparator />
      <DropdownMenuItem disabled={order.status === "CANCELLED_BY_USER"} onClick={() => router.push(`/user/${order.userId}/orders/${order.id}`)}>
        View Order
        <DropdownMenuShortcut>
          <Icons.eye size={18} />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />

      <Dialog>
        <DialogTrigger
          disabled={(order.invoice ? false : true) || order.status === "CANCELLED_BY_USER"}
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

      <DropdownMenuItem disabled={order.status === "CANCELLED_BY_USER"} onClick={() => onCancel(order.id)} className="text-red-600 bg-destructive/30">
        Cancel
        <DropdownMenuShortcut>
          <Icons.cancel size={18} />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
