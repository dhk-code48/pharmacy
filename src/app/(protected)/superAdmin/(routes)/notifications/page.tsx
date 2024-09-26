import { auth } from "@/auth";
import AppHeader from "@/components/layout/AppHeader";
import { Notifications } from "@/components/layout/NotificationsDialog";
import { redirect } from "next/navigation";

const NotificationPage = async () => {
  const session = await auth();
  if (!session?.user.id) redirect("/login");
  return (
    <>
      <AppHeader redirectId="" title="Notifications" type="superAdmin" />
      <div>
        <strong className="text-sm text-muted-foreground">Notifications</strong>
        <Notifications userId={session.user.id} />
      </div>
    </>
  );
};

export default NotificationPage;
