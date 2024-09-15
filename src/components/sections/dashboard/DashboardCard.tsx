import { Icons } from "@/components/shared/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconNames } from "@/types";
import React from "react";

const DashboardCard = ({ icon, title, value, caption }: { caption?: string; icon: IconNames; title: string; value: string | number }) => {
  const Icon = Icons[icon || "checkCircle"];
  return (
    <Card className="size-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {caption && <p className="text-xs text-muted-foreground">{caption}</p>}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
