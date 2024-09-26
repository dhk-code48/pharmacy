import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import CardSkeletons from "@/components/sections/skeletons/CardSkeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function SuperAdminLoading() {
  return (
    <>
      <DashboardHeading heading="Dashboard" text="View your website activity and stats" />
      <CardSkeletons cards={3} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Skeleton className="w-full h-72" />
      </div>
    </>
  );
}
