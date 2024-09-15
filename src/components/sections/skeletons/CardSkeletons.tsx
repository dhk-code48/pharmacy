import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CardSkeletons = ({ cards }: { cards: number }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 items-center">
      {Array.from({ length: cards }).map((index) => (
        <Card key={"skeleton-card-" + index} className="size-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-4 w-24" />
            </CardTitle>
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardSkeletons;
