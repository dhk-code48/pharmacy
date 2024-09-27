import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function PharmacyOrderLoading() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold">
            Order Id: <Skeleton className="w-10 h-5" />{" "}
          </div>
          <p className="text-xs text-muted-foreground">Manage order details and progress</p>
        </div>
        <Badge>
          <Skeleton className="size-full" />
        </Badge>
      </div>
      <div className="mb-6">
        <Label>Order Progress</Label>
        <Skeleton className="w-full mt-2" />
      </div>
      <div className="w-full">
        <div className="grid w-full grid-cols-4">
          <div className="p-3">Details</div>
          <div className="p-3">Invoice</div>
          <div className="p-3">Prescription</div>
          <div className="p-3">Timeline</div>
        </div>

        <Skeleton className="w-full h-20" />
      </div>

      <Skeleton className="w-10 h-5" />
      <Skeleton className="w-10 h-5" />
      <Skeleton className="w-10 h-5" />
    </div>
  );
}
