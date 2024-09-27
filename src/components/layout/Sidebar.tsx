"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";
import React, { FC, Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../shared/Icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { SidebarLinks, SidebarNavItem } from "@/types";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Session } from "next-auth";
import InstallPWAButton from "../shared/InstallPwa";
import FeedbackDialog from "./FeedbackDialog";
import dynamic from "next/dynamic";

type SidebarProps = {
  prefix: string;
  links: SidebarNavItem[];
};

const Sidebar: FC<SidebarProps> = ({ prefix, links }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);

  const { isTablet } = useMediaQuery();

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  useEffect(() => {
    setIsSidebarExpanded(!isTablet);
  }, [isTablet]);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="sticky top-0 h-full">
        <ScrollArea className="h-full overflow-y-auto border-r">
          <aside className={cn(isSidebarExpanded ? "w-[220px] xl:w-[260px]" : "w-[68px]", "hidden h-screen md:block border")}>
            <div className="flex h-full max-h-screen flex-1 flex-col gap-2">
              <div className="flex h-14 items-center p-4 lg:h-[60px]">
                {isSidebarExpanded && <Logo />}
                <Button variant="ghost" size="icon" className="ml-auto size-9 lg:size-8" onClick={toggleSidebar}>
                  {isSidebarExpanded ? (
                    <Icons.leftCollapse size={18} className="stroke-muted-foreground" />
                  ) : (
                    <Icons.rightCollapse size={18} className="stroke-muted-foreground" />
                  )}
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </div>

              <nav className="flex flex-1 flex-col gap-8 px-4 pt-4">
                {links.map((section) => (
                  <section key={section.title} className="flex flex-col gap-0.5">
                    {isSidebarExpanded ? <p className="text-xs text-muted-foreground">{section.title}</p> : <div className="h-4" />}
                    {section.items.map((item) => (
                      <SidebarLink key={item.href} prefix={prefix} isSidebarExpanded={isSidebarExpanded} item={item} />
                    ))}
                  </section>
                ))}
              </nav>
              <div className="flex flex-col gap-2 p-4">
                <FeedbackDialog isSidebarExpanded={isSidebarExpanded} />
                <InstallPWAButton isSidebarExpanded={isSidebarExpanded} />
              </div>
            </div>
          </aside>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
};

const SidebarContent = dynamic(() => import("./LazyMobileSidebarContent"), { ssr: false });

export function MobileSheetSidebar({ links, prefix, user }: SidebarProps & { user?: Session["user"] }) {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider delayDuration={0}>
      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="size-9 shrink-0 md:hidden" onClick={() => setOpen(true)}>
            <Icons.menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        {open && (
          <SheetContent side="left" className="flex flex-col p-0">
            <SidebarContent links={links} prefix={prefix} pharmacyId={user?.pharmacyId} />
          </SheetContent>
        )}
      </Sheet>
    </TooltipProvider>
  );
}

export const SidebarLink = ({ item, isSidebarExpanded, prefix = "" }: { item: SidebarLinks; isSidebarExpanded: boolean; prefix?: string }) => {
  const path = usePathname();
  const Icon = Icons[item.icon || "arrowRight"];
  const href = prefix + item.href;
  return (
    <Fragment key={`${href}-${item.title}`}>
      {isSidebarExpanded ? (
        <Link
          key={`link-${item.title}`}
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
            path === href ? "bg-muted text-primary" : "text-muted-foreground hover:text-accent-foreground"
          )}
        >
          <Icon className="size-5" />
          {item.title}
        </Link>
      ) : (
        <Tooltip key={`tooltip-${href}-${item.title}`}>
          <TooltipTrigger asChild>
            <Link
              key={`link-tooltip-${href}-${item.title}`}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md py-2 text-sm font-medium hover:bg-muted",
                path === href ? "bg-muted text-primary" : "text-muted-foreground hover:text-accent-foreground"
              )}
            >
              <span className="flex size-full items-center justify-center">
                <Icon className="size-5" />
              </span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{item.title}</TooltipContent>
        </Tooltip>
      )}
    </Fragment>
  );
};

export { Sidebar };
