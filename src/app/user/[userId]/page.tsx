"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
import { useGeolocation } from "@/providers/GeoLocationProvider";
import { fetchAddress } from "@/actions";
import findNearestPharmacies from "@/actions/pharmacy/findNearestPharmacy";
import NearestPharmaciesCard from "./_components/NearestPharmacy";
import PrescriptionUploadCard from "@/components/forms/order/PrescriptionUploadCard";
import OrderConfirmationDialog from "@/components/forms/order/OrderConfirmDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PageProps {
  params: {
    userId: string;
  };
}

export default function UserDashboard({ params }: PageProps) {
  const { location } = useGeolocation();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newOrder, setNewOrder] = useState<number | null>(null);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const {
    data: address,
    isLoading: isAddressLoading,
    isError: isAddressError,
  } = useQuery({
    queryKey: ["address", location?.latitude, location?.longitude],
    queryFn: () => fetchAddress(location?.latitude || 0, location?.longitude || 0),
    enabled: !!location,
  });

  if (!isMounted) return null;

  return (
    <ScrollArea className="space-y-5 min-h-screen overflow-auto">
      <AppBreadcrumb items={[{ href: "#", label: "Dashboard" }]} />
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <NearestPharmaciesCard
          nearestPharmacies={nearestPharmacies}
          isLoading={isPharmaciesLoading}
          isError={isPharmaciesError}
          error={pharmaciesError}
          locationAccuracy={location?.accuracy}
        />
        {address && !isAddressError && location && (
          <PrescriptionUploadCard
            nearestPharmacies={nearestPharmacies}
            address={address}
            isAddressLoading={isAddressLoading}
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
    </ScrollArea>
  );
}

// "use client";

// import { useQuery } from "@tanstack/react-query";
// import findNearestPharmacies from "@/actions/pharmacy/findNearestPharmacy";
// import createOrder from "@/actions/user/createOrder";
// import createPrescription from "@/actions/user/createPrescription";
// import ImageUpload from "@/components/forms/ImageUpload";
// import { AppBreadcrumb } from "@/components/layout/AppBreadcrumb";
// import { Icons } from "@/components/shared/Icons";
// import { Badge } from "@/components/ui/badge";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useGeolocation } from "@/providers/GeoLocationProvider";
// import { NearestPharmacy } from "@/types";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState, useTransition } from "react";
// import { toast } from "sonner";
// import { Skeleton } from "@/components/ui/skeleton";
// import { sendNotification } from "@/actions/pwa";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { sideCannonConfetti } from "@/lib/utils";
// import { Order, Pharmacy, UserAddress } from "@prisma/client";
// import Link from "next/link";
// import { fetchAddress } from "@/actions";

// interface PageProps {
//   params: {
//     userId: string;
//   };
// }

// const UserDashboard = ({ params }: PageProps) => {
//   const { location } = useGeolocation();
//   const [prescription, setPrescription] = useState<string[]>([]);
//   const [label, setLabel] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [isPending, startTransition] = useTransition();
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [userAddress, setUserAddress] = useState<UserAddress>();

//   const [newOrder, setNewOrder] = useState<number | null>(null);
//   const router = useRouter();

//   const {
//     data: nearestPharmacies,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["nearestPharmacies", location?.latitude, location?.longitude],
//     queryFn: () => findNearestPharmacies(location?.latitude || 0, location?.longitude || 0, 3),
//     enabled: !!location,
//   });

//   const {
//     data: address,
//     isLoading: isAddressLoading,
//     isError: isAddressError,
//   } = useQuery({
//     queryKey: ["address", location?.latitude, location?.longitude],
//     queryFn: () => fetchAddress(location?.latitude || 0, location?.longitude || 0),
//     enabled: !!location,
//   });

//   function onSubmit() {
//     startTransition(() => {
//       const pharmacy = nearestPharmacies?.[0];
//       pharmacy &&
//         toast.promise(createPrescription(prescription, pharmacy.slug, label, description, pharmacy.userId), {
//           loading: `Submitting your prescription to ${pharmacy.name}`,
//           success: async (order) => {
//             sideCannonConfetti();
//             setDialogOpen(true);
//             setNewOrder(order.id);
//             return "Order submitted successfully!";
//           },
//           error: (e) => {
//             console.log("E => ", e);
//             return "Unexpected Error Occurred, Please Try again!";
//           },
//         });
//     });
//   }

//   const [isMounted, setIsMounted] = useState<boolean>(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   return (
//     isMounted && (
//       <div className="space-y-5 min-h-screen overflow-auto">
//         <AppBreadcrumb items={[{ href: "#", label: "Dashboard" }]} />
//         <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//           <Card className="size-full">
//             <CardHeader>
//               <CardTitle>Nearest Pharmacies</CardTitle>
//               <CardDescription>Pharmacies close to your location</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {isLoading && <Skeleton className="h-8 w-full" />}
//               {isError && <p className="text-sm text-red-500">Error: {error.message}</p>}
//               {nearestPharmacies && nearestPharmacies?.length > 0 ? (
//                 <div className="space-y-1">
//                   {nearestPharmacies.map(
//                     (pharmacy, index) =>
//                       pharmacy.distance && (
//                         <div className="flex items-center justify-between" key={"nearest-pharmacy-" + index}>
//                           <p className="text-sm">{pharmacy.name}</p>
//                           <p className="text-sm text-muted-foreground">{(pharmacy.distance / 1000).toFixed(2)} km</p>
//                         </div>
//                       )
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-sm bg-accent opacity-50 py-2 rounded-xl text-center">Not Found</p>
//               )}
//               <div className="flex justify-end my-1">
//                 <Badge variant="secondary">Location Accuracy {location?.accuracy.toFixed(0)}%</Badge>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full" variant="outline">
//                 View All Pharmacies
//               </Button>
//             </CardFooter>
//           </Card>
//           <Card className="size-full">
//             <CardHeader>
//               <CardTitle>Upload Prescription</CardTitle>
//               <CardDescription>Submit a new prescription for processing</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <ImageUpload
//                 disabled={isPending || !nearestPharmacies?.length || location?.accuracy === 0}
//                 onChange={(url) => setPrescription((prev) => [...prev, url])}
//                 onRemove={(url) => setPrescription((prev) => prev.filter((img) => img !== url))}
//                 value={prescription}
//                 multiple
//               />
//               {prescription.length > 0 && (
//                 <>
//                   <Input
//                     disabled={isPending}
//                     onChange={(e) => setLabel(e.target.value)}
//                     value={label}
//                     required
//                     placeholder="Label your prescription (required)"
//                   />
//                   <Input
//                     disabled={isPending}
//                     onChange={(e) => setDescription(e.target.value)}
//                     value={description}
//                     placeholder="Provide description for prescription (optional)"
//                   />
//                   <Input value={address?.municipality} disabled={isPending} placeholder="Shuklagandaki, Kathmandu..." />
//                   <Input
//                     value={address?.city_district && address.city_district.split("-")?.[1]}
//                     disabled={isPending}
//                     placeholder="Ward Number :- 01, 02, ...."
//                   />
//                   <Input value={address?.town} disabled={isPending} placeholder="Thamel, Pokhara ...." />
//                   <Input value={address?.county} disabled={isPending} placeholder="Kathmandu / Kaski" />
//                   <Input value={address?.state} disabled={isPending} placeholder="Gandaki / Bagmati" />
//                 </>
//               )}
//             </CardContent>
//             <CardFooter>
//               {prescription.length > 0 && (
//                 <Button disabled={isPending} onClick={onSubmit}>
//                   Submit
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>
//           <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//             {nearestPharmacies && (
//               <DialogContent className="h-fit max-w-sm rounded-xl">
//                 <div className="size-20 mx-auto bg-green-500 text-white rounded-full flex items-center justify-center">
//                   <Icons.check size={50} stroke={5} />
//                 </div>
//                 <div className="text-center prose dark:prose-invert">
//                   <h3>Order has been Placed</h3>
//                   <p>Congratulations, your new order has been successfully placed with below details</p>
//                 </div>
//                 <strong>Order Details :</strong>
//                 <ul>
//                   <li>Order Id : O-{newOrder}</li>
//                   <li>Pharmacy: {nearestPharmacies?.[0]?.name}</li>
//                 </ul>
//                 <Link href={`/user/${params.userId}/orders/${newOrder}`} className={buttonVariants()}>
//                   View More
//                 </Link>
//               </DialogContent>
//             )}
//           </Dialog>
//         </div>
//       </div>
//     )
//   );
// };

// export default UserDashboard;
