"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import { UserAvatar } from "@/components/shared/UserAvatar";

// Dynamic imports
const DropdownMenu = dynamic(() => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenu), { ssr: false });
const DropdownMenuTrigger = dynamic(() => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuTrigger), { ssr: false });
const DropdownMenuContent = dynamic(() => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuContent), { ssr: false });
const DropdownMenuItem = dynamic(() => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuItem), { ssr: false });
const DropdownMenuSeparator = dynamic(() => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuSeparator), { ssr: false });
const IconLayoutDashboardFilled = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconLayoutDashboardFilled), { ssr: false });
const IconSettingsFilled = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconSettingsFilled), { ssr: false });
const IconLogout = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconLogout), { ssr: false });

export function UserAccount({ session }: { session: Session }) {
  const user = session?.user;
  const [open, setOpen] = useState(false);

  if (!user) return <div className="size-8 animate-pulse rounded-full border bg-muted" />;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <UserAvatar name={session.user.name} image={session.user.image} className="size-8 border" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center space-x-2.5">
            <IconLayoutDashboardFilled className="size-4" />
            <p className="text-sm">Dashboard</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="flex items-center space-x-2.5">
            <IconSettingsFilled className="size-4" />
            <p className="text-sm">Settings</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/`,
            });
          }}
        >
          <div className="flex items-center space-x-2.5">
            <IconLogout className="size-4" />
            <p className="text-sm">Log out</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
