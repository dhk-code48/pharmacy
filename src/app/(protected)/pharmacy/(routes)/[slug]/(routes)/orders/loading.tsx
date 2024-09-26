import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function AdminPanelLoading() {
  return (
    <div className="space-y-5">
      <DashboardHeading heading="Orders" text="Manage your pharmacy orders from here" />
      <TableSkeleton />
    </div>
  );
}
