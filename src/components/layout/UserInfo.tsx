import { User, UserAddress } from "@prisma/client";
import React, { FC } from "react";
import { Icons } from "../shared/Icons";
import { UserAvatar } from "../shared/UserAvatar";
import { formatAddress } from "@/lib/address";
import { formatNumber } from "@/lib/utils";

const UserInfo: FC<{ user: User; addresses: UserAddress[] }> = ({ user, addresses }) => {
  return (
    <div className="flex flex-col items-center">
      <UserAvatar name={user.name} image={user.image} />
      <h5 className="text-lg font-semibold">{user.name}</h5>
      <div className="flex text-muted-foreground items-center gap-2">
        <Icons.mail size={18} />
        {user.email}
      </div>
      <div className="flex text-muted-foreground items-center gap-2">
        <Icons.phone size={18} />
        {user.phoneNumber}
      </div>
      <div className="text-left p-5 w-full">
        <p className="text-sm">{addresses.length > 1 ? "Recent Address Used By User" : "User Address"} </p>
        {addresses.length > 0 ? (
          addresses.map((address, index) => {
            return (
              <div key={address.id} className="bg-muted px-5 py-3 rounded-lg">
                <p className="text-sm font-semibold text-muted-foreground">Id: {formatNumber(index + 1)}</p>
                <p>Municipality : {formatAddress(address as UserAddress, "{{M}} - {{W}}, {{T}}")}</p>
                <p>District : {formatAddress(address as UserAddress, "{{D}}")}</p>
                <p>Province : {formatAddress(address as UserAddress, "{{S}}")}</p>
              </div>
            );
          })
        ) : (
          <p className="italic text-muted-foreground text-sm">Not Address Found</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
