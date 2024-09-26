import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function SuperAdminFeedbacksLoading() {
  return (
    <div className="space-y-5">
      <DashboardHeading heading="Feedbacks" text="View feedbacks from user and pharmacies" />
      <TableSkeleton />
    </div>
  );
}
