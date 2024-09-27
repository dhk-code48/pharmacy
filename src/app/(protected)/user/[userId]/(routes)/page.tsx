"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
import { useGeolocation } from "@/providers/GeoLocationProvider";
import findNearestPharmacies from "@/actions/pharmacy/findNearestPharmacy";
import NearestPharmaciesCard from "../_components/NearestPharmacy";
import PrescriptionUploadCard from "@/components/forms/order/PrescriptionUploadDialog";
import OrderConfirmationDialog from "@/components/forms/order/OrderConfirmDialog";
import AppHeader from "@/components/layout/AppHeader";
import PharmacyMap from "@/components/shared/PharmacyMap";
import { DashboardHeading } from "@/components/sections/dashboard/DashboardHeading";
import { fetchSubscriptions } from "@/actions/fetchSubscription";
import { sendNotification } from "@/actions/pwa";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: {
    userId: string;
  };
}

export default function UserDashboard({ params }: PageProps) {
  const { location } = useGeolocation();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newOrder, setNewOrder] = useState<number | null>(null);

  const {
    data: nearestPharmacies,
    isLoading: isPharmaciesLoading,
    isError: isPharmaciesError,
    error: pharmaciesError,
  } = useQuery({
    queryKey: ["nearestPharmacies", location?.latitude, location?.longitude],
    queryFn: () => findNearestPharmacies(location?.latitude || 0, location?.longitude || 0, 3),
    enabled: !!location,
  });

  const sendNotificationToAll = async () => {
    const subscriptions = await fetchSubscriptions();
    if (subscriptions) {
      subscriptions.map((sub) =>
        sendNotification(sub, {
          message: "Notification Message",
          title: "Notification Title",
          icon: "/icons/pharmacy.png",
        })
      );
    }
  };

  const onClick = () => {
    toast.promise(sendNotificationToAll, {
      loading: "Sending Notification To All",
      success: "Notification Sended",
      error: (error) => {
        console.log("ERROR => ", error);
        return "OOPs";
      },
    });
  };

  return (
    <div className="space-y-5">
      <Button onClick={onClick}>Send Notification</Button>

      <DashboardHeading heading="Dashboard" text="Manage and view your activity" />
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
        <AppHeader redirectId={params.userId} title="Dashboard" type="user" />
        <NearestPharmaciesCard
          nearestPharmacies={nearestPharmacies}
          isLoading={isPharmaciesLoading}
          isError={isPharmaciesError}
          error={pharmaciesError}
          locationAccuracy={location?.accuracy}
        />
        {location && (
          <PrescriptionUploadCard
            nearestPharmacies={nearestPharmacies}
            location={location}
            onOrderSubmitted={(orderId) => {
              setNewOrder(orderId);
              setDialogOpen(true);
            }}
          />
        )}
      </div>
      <OrderConfirmationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        orderId={newOrder}
        pharmacyName={nearestPharmacies?.[0]?.name}
        userId={params.userId}
      />

      <PharmacyMap loading={false} />
    </div>
  );
}
