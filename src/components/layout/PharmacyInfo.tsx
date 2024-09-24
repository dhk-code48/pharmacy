import { Pharmacy, PharmacyAddress, User } from "@prisma/client";
import React from "react";
import { Icons } from "../shared/Icons";
import { Badge } from "../ui/badge";
import { UserAvatar } from "../shared/UserAvatar";
import { formatAddress } from "@/lib/address";

const PharmacyInfo = ({ pharmacy }: { pharmacy: Pharmacy & { user: User; address: PharmacyAddress } }) => {
  return (
    <div className="text-center">
      <Icons.pharmacy className="text-muted-foreground size-10 mx-auto" />
      <h5 className="text-lg font-semibold">{pharmacy.name}</h5>
      <p>{pharmacy.description}</p>
      <p className="text-muted-foreground">{formatAddress(pharmacy.address, "{{M}}-{{W}}, {{T}}, {{D}}, {{S}} ")}</p>
      <div className="flex gap-2 m-3 justify-center">
        <Badge variant="outline" className="select-none gap-2">
          <Icons.verified className="size-5" />
          {pharmacy.status}
        </Badge>
      </div>
      <p className="text-left font-semibold">Pharmacy By:</p>
      <div className="flex group hover:bg-muted transition-all items-center my-3 gap-3 px-3 py-2 rounded-xl">
        <UserAvatar image={pharmacy.user.image} name={pharmacy.user.name} />
        <div className="text-left">
          <p className="font-semibold">{pharmacy.user.name}</p>
          <p className="text-sm font-medium text-muted-foreground">{pharmacy.user.email}</p>
          <p className="text-sm font-medium text-muted-foreground">{pharmacy.user.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default PharmacyInfo;
