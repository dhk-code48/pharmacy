import { SidebarNavItem } from "@/types";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { TooltipProvider } from "../ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Icons } from "../shared/Icons";
import { useState } from "react";
import { Session } from "next-auth";

type SidebarProps = {
  prefix: string;
  links: SidebarNavItem[];
};

const SidebarContent = dynamic(() => import("./LazyMobileSidebarContent"), { ssr: false });

const MobileSidebar = ({ links, prefix, user }: SidebarProps & { user?: Session["user"] }) => {
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
};

export default MobileSidebar;
