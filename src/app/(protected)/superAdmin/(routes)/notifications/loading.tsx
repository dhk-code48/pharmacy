import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPanelLoading() {
  return (
    <div className="space-y-5">
      <DashboardHeading heading="Notifications" text="View your recent notifications from here" />
      <div className="space-y-3">
        <Skeleton className="h-10 w-[348px]" />
        <Skeleton className="h-10 w-[348px]" />
        <Skeleton className="h-10 w-[348px]" />
        <Skeleton className="h-10 w-[348px]" />
      </div>
    </div>
  );
}
