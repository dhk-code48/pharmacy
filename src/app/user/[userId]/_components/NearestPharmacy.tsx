import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { NearestPharmacy } from "@/types";

interface NearestPharmaciesCardProps {
  nearestPharmacies: NearestPharmacy[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  locationAccuracy: number | undefined;
}

export default function NearestPharmaciesCard({ nearestPharmacies, isLoading, isError, error, locationAccuracy }: NearestPharmaciesCardProps) {
  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Nearest Pharmacies</CardTitle>
        <CardDescription>Pharmacies close to your location</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2 my-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : isError ? (
          <p className="text-sm text-red-500">Error: {error?.message}</p>
        ) : nearestPharmacies && nearestPharmacies.length > 0 ? (
          <div className="space-y-1">
            {nearestPharmacies.map(
              (pharmacy, index) =>
                pharmacy.distance && (
                  <div className="flex items-center justify-between" key={`nearest-pharmacy-${index}`}>
                    <p className="text-sm">{pharmacy.name}</p>
                    <p className="text-sm text-muted-foreground">{(pharmacy.distance / 1000).toFixed(2)} km</p>
                  </div>
                )
            )}
          </div>
        ) : (
          <p className="text-sm bg-accent opacity-50 py-2 rounded-xl text-center">Not Found</p>
        )}
        <div className="flex justify-end my-1">
          <Badge variant="secondary">Location Accuracy {locationAccuracy?.toFixed(0)}%</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
