import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function SuperAdminIssuesLoading() {
  return (
    <div className="space-y-5">
      <DashboardHeading heading="Issues" text="View issues from users" />
      <TableSkeleton />
    </div>
  );
}
