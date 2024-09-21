import { auth } from "@/auth";
import AppHeader from "@/components/layout/AppHeader";
import { Notifications } from "@/components/layout/NotificationsDialog";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { redirect } from "next/navigation";
import React, { use } from "react";

const NotificationPage = async () => {
  const session = await auth();
  if (!session?.user.id) redirect("/login");
  return (
    <>
      <AppHeader redirectId="" title="Notifications" type="superAdmin" />
      <MaxWidthWrapper className="mt-14 md:mt-0">
        <strong className="text-sm text-muted-foreground">Notifications</strong>
        <Notifications userId={session.user.id} />
      </MaxWidthWrapper>
    </>
  );
};

export default NotificationPage;
