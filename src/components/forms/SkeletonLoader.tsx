// SkeletonLoader.tsx
import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-4 size-full">
      <Skeleton className="h-6"></Skeleton>
      <Skeleton className="h-6"></Skeleton>
      <Skeleton className="h-6"></Skeleton>
      <Skeleton className="h-6"></Skeleton>
      <Skeleton className="h-6"></Skeleton>
    </div>
  );
};

export default SkeletonLoader;
