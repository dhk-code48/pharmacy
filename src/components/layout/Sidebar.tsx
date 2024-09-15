"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";
import React, { FC, Fragment, useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "../shared/Icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { SidebarNavItem } from "@/types";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { UserAccount } from "./UserAccount";
import { ThemeToggle } from "./ThemeToggle";
import { Session, User } from "next-auth";
import InstallPWAButton from "../shared/InstallPwa";

type SidebarProps = {
  prefix: string;
  links: SidebarNavItem[];
};

const Sidebar: FC<SidebarProps> = ({ prefix, links }) => {
  const path = usePathname();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("sidebarExpanded");
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("sidebarExpanded", JSON.stringify(isSidebarExpanded));
    }
  }, [isSidebarExpanded]);

  const { isTablet } = useMediaQuery();

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    setIsSidebarExpanded(!isTablet);
  }, [isTablet]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
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
                      {section.items.map((item) => {
                        const Icon = Icons[item.icon || "arrowRight"];
                        const href = prefix + item.href;
                        return (
                          <Fragment key={`link-fragment-${item.title}`}>
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
                              <Tooltip key={`tooltip-${item.title}`}>
                                <TooltipTrigger asChild>
                                  <Link
                                    key={`link-tooltip-${item.title}`}
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
                      })}
                    </section>
                  ))}
                  <InstallPWAButton isSidebarExpanded={isSidebarExpanded} />
                </nav>
              </div>
            </aside>
          </ScrollArea>
        </div>
      </TooltipProvider>
    )
  );
};

export function MobileSheetSidebar({ links, prefix, user }: SidebarProps & { user?: Session["user"] }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { isSm, isMobile } = useMediaQuery();

  if (isSm || isMobile) {
    return (
      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="size-9 shrink-0 md:hidden">
            <Icons.menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <ScrollArea className="h-full overflow-y-auto">
            <div className="flex h-screen flex-col">
              <nav className="flex flex-1 flex-col gap-y-8 p-6 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                  <Logo />
                </Link>
                {links.map((section) => (
                  <section key={section.title} className="flex flex-col gap-0.5">
                    <p className="text-xs text-muted-foreground">{section.title}</p>

                    {section.items.map((item) => {
                      const Icon = Icons[item.icon || "arrowRight"];
                      const href = prefix + item.href;
                      return (
                        <Fragment key={`link-fragment-${item.title}`}>
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
                        </Fragment>
                      );
                    })}
                  </section>
                ))}
                <InstallPWAButton isSidebarExpanded={false} />
                <section className="space-y-2 flex flex-col">
                  {!user?.pharmacyId && (
                    <Link className={buttonVariants({ variant: "outline" })} href="/pharmacy/create">
                      Own A pharmacy?, Create One
                    </Link>
                  )}
                  <UserAccount />
                  <ThemeToggle />
                </section>
              </nav>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return <div className="flex size-9 animate-pulse rounded-lg bg-muted md:hidden" />;
}

export { Sidebar };
