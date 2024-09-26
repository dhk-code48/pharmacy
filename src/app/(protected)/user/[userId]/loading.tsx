import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import CardSkeletons from "@/components/sections/skeletons/CardSkeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserDashboardLoading() {
  return (
    <>
      <DashboardHeading heading="Dashboard" text="Manage and view your activity" />
      <CardSkeletons cards={2} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Skeleton className="w-full h-72" />
      </div>
    </>
  );
}
