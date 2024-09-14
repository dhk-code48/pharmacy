import { User } from "@prisma/client";
import React, { FC } from "react";
import { Icons } from "../shared/Icons";
import { Button } from "../ui/button";

const UserInfo: FC<{ user: User }> = ({ user }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="size-14 bg-accent rounded-full border flex items-center justify-center">
        <Icons.user size={30} />
      </div>
      <h5 className="text-lg font-semibold">{user.name}</h5>
      <div className="flex text-muted-foreground items-center gap-2">
        <Icons.mail size={18} />
        {user.email}
      </div>
      <div className="grid grid-cols-[50px_1fr] place-items-start my-5 place-content-center text-left">
        <Icons.phone size={18} />
        +977 9846115544
        <Icons.address size={18} />
        <span className="text-sm">Shuklagandaki-02, Kotre, Tanahun, Gandaki Province</span>
      </div>
    </div>
  );
};

export default UserInfo;
