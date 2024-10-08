import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function AdminPanelLoading() {
  return (
    <div className="space-y-5">
      <DashboardHeading heading="Reviews" text="Manage your pharmacy reviews from here" />
      <TableSkeleton />
    </div>
  );
}
