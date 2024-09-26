import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function SuperAdminUsersLoading() {
  return (
    <div className="space-y-5">
      <DashboardHeading heading="Users" text="Manage and view your customers info" />
      <TableSkeleton />
    </div>
  );
}
