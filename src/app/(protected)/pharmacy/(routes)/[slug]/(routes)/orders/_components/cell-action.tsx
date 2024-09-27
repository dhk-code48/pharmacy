"use client";

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

import InvoiceForm from "@/components/forms/InvoiceForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { default as InvoiceUi } from "@/components/shared/Invoice";
import PrescriptionImages from "@/components/layout/PrescriptionImages";
import markOutOfStock from "@/actions/pharmacy/markOutOfStock";
import UserInfo from "@/components/layout/UserInfo";
import { PaginatedPharmacyOrder } from "@/types";
import { Icons } from "@/components/shared/Icons";
import { useRouter } from "next/navigation";

export default function CellAction({ order }: { order: PaginatedPharmacyOrder }) {
  const router = useRouter();

  return (
    <DropdownMenuContent align="end" className="w-screen max-w-[12rem]">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>

      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => router.push(`/pharmacy/${order.pharmacySlug}/orders/${order.id}`)}>
        View More
        <DropdownMenuShortcut>
          <Icons.eye size={18} />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />

      <Dialog>
        <DialogTrigger className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground">
          View Prescription
        </DialogTrigger>
        <DialogContent className="py-5 grid place-content-center">
          <PrescriptionImages images={order.prescription.images} />
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground">
          User Info
        </DialogTrigger>
        <DialogContent>
          <UserInfo user={order.user} addresses={[order.userAddress]} />
        </DialogContent>
      </Dialog>
      <DropdownMenuSeparator />

      {order.invoice ? (
        <Dialog>
          <DialogTrigger className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors w-full hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            View Invoice
          </DialogTrigger>
          <DialogContent className="max-w-screen-xl">
            <InvoiceUi invoice={order.invoice} order={order} pharmacy={order.pharmacy} />
          </DialogContent>
        </Dialog>
      ) : (
        order.status !== "OUT_OF_STOCK" && <InvoiceForm prescription={order.prescription} pharmacyId={order.pharmacy.id} orderId={order.id} />
      )}

      <DropdownMenuItem
        disabled={order.invoice || order.status === "OUT_OF_STOCK" ? true : false}
        onClick={() => {
          toast.promise(markOutOfStock(order.id), {
            loading: "Updating order status...",
            error: "Unexpected Error Occurred, Try Again",
            success: "Marked Out of Stock",
          });
        }}
      >
        Mark Out of Stock
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </DropdownMenuContent>
  );
}
