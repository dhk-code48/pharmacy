import getPharmacy from "@/actions/pharmacy/getPharmacy";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense, use } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

const SuspensePage = ({ slug }: { slug: string }) => {
  const pharmacy = use(getPharmacy({ slug }));

  return <div>{pharmacy.name}</div>;
};

const PharmacySlugPage = ({ params }: PageProps) => {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<Skeleton className="size-10" />}>
          <SuspensePage slug={params.slug} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default PharmacySlugPage;
