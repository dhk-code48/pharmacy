import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function SuperAdminPharmaciesLoading() {
  return (
    <div className="space-y-5">
      <DashboardHeading heading="Pharmacies" text="View and manage pharmacies" />
      <TableSkeleton />
    </div>
  );
}
