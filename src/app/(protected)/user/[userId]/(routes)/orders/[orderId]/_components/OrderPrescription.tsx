import PrescriptionImages from "@/components/layout/PrescriptionImages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Media, Prescription } from "@prisma/client";
import React from "react";

const OrderPrescription = ({ prescription }: { prescription: Prescription & { images: Media[] } }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescription Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Label</Label>
            <p>{prescription.label}</p>
          </div>
          <div>
            <Label>Description</Label>
            <p>{prescription.description}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <h4 className="font-semibold mb-2">Prescription Images</h4>

        <PrescriptionImages images={prescription.images} />
      </CardContent>
    </Card>
  );
};

export default OrderPrescription;
