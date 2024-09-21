import { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/shared/Icons";
import { Session } from "next-auth";
import { User } from "@prisma/client";

interface UserAvatarProps extends AvatarProps {
  name: string | null | undefined;
  image: string | null | undefined;
}

export function UserAvatar({ name, image, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {image ? (
        <AvatarImage alt="Picture" src={image} referrerPolicy="no-referrer" />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{name}</span>
          <Icons.user className="size-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
