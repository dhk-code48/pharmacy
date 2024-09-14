import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: number | null;
  pharmacyName: string | undefined;
  userId: string;
}

export default function OrderConfirmationDialog({ open, onOpenChange, orderId, pharmacyName, userId }: OrderConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-fit max-w-sm rounded-xl">
        <div className="size-20 mx-auto bg-green-500 text-white rounded-full flex items-center justify-center">
          <Icons.check size={50} stroke={5} />
        </div>
        <div className="text-center prose dark:prose-invert">
          <h3>Order has been Placed</h3>
          <p>Congratulations, your new order has been successfully placed with below details</p>
        </div>
        <strong>Order Details :</strong>
        <ul>
          <li>Order Id : O-{orderId}</li>
          <li>Pharmacy: {pharmacyName}</li>
        </ul>
        <Link href={`/user/${userId}/orders/${orderId}`} passHref>
          <Button className="w-full">View More</Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
