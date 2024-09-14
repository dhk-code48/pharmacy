"use client";

import { useContext } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useSession } from "next-auth/react";

import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/useScroll";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/shared/Icons";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function MarketingHeader({ scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const { data: session, status } = useSession();

  const selectedLayout = useSelectedLayoutSegment();
  const documentation = selectedLayout === "docs";

  const links = marketingConfig.mainNav;

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
      }`}
    >
      <MaxWidthWrapper className="flex h-14 items-center justify-center md:justify-between p-4" large={documentation}>
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-1.5">
            <Icons.pharmacy />
            <span className="font-urban text-xl font-bold">{siteConfig.name}</span>
          </Link>

          {links && links.length > 0 ? (
            <nav className="hidden gap-6 md:flex">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  prefetch={true}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    item.href.startsWith(`/${selectedLayout}`) ? "text-foreground" : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center space-x-3">
          {session ? (
            <Link
              href={
                session.user.role === "ADMIN"
                  ? "/admin"
                  : session.user.pharmacyId
                  ? `/pharmacy/${session.user.pharmacyId}`
                  : `/user/${session.user.id}`
              }
              className="hidden md:block"
            >
              <Button className="gap-2 px-5 rounded-full" variant="default" size="sm">
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : status === "unauthenticated" ? (
            <Link href="/login" className={buttonVariants({ className: "hidden gap-2 px-5 md:flex rounded-full", size: "sm" })}>
              <span>Sign In</span>
            </Link>
          ) : (
            <Skeleton className="hidden h-9 w-28 rounded-full lg:flex" />
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
