import { auth } from "@/auth";
import AppHeader from "@/components/layout/AppHeader";
import { Notifications } from "@/components/layout/NotificationsDialog";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { redirect } from "next/navigation";
import React, { use } from "react";

const NotificationPage = async () => {
  const session = await auth();
  if (!session?.user.id) redirect("/login");
  return (
    <>
      <AppHeader redirectId="" title="Notifications" type="superAdmin" />
      <DashboardHeading heading="Notifications" text="Manage your pharmacy notifications from here" />
      <div className="mx-auto">
        <Notifications userId={session.user.id} />
      </div>
    </>
  );
};

export default NotificationPage;
