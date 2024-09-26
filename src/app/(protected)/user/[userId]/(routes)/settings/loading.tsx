import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPanelLoading() {
  return (
    <div className="space-y-5">
      <DashboardHeading heading="Settings" text="Manage your settings from here" />
      <div className="flex items-center justify-between border px-3 py-4 rounded-xl">
        <div>
          <strong>Notifications</strong>
          <p className="text-xs">Get notified and track your order status</p>
        </div>
        <Skeleton className="w-10 h-5 rounded-2xl" />
      </div>
      <div className="border p-4 rounded-xl">
        <strong>Theme</strong>
        <p className="text-sm text-muted-foreground">Select the theme for the application.</p>
        <div className="flex mt-5 -z-30 gap-10 flex-wrap">
          <Skeleton className="size-20" />
          <Skeleton className="size-20" />
          <Skeleton className="size-20" />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 items-start justify-between border px-3 py-4 rounded-xl">
        <div className="max-w-sm">
          <p className="text-sm font-semibold">User Form</p>
          <p className="text-sm text-muted-foreground">Update your user details below, Note that all the user details should be legit and truth</p>
        </div>
        <Skeleton className="max-w-sm size-full max-h-40" />
      </div>
    </div>
  );
}
