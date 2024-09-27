import { buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import Logo from "./Logo";
import InstallPWAButton from "../shared/InstallPwa";
import { SidebarNavItem } from "@/types";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

type SidebarProps = {
  prefix: string;
  links: SidebarNavItem[];
};

const SidebarLink = dynamic(() => import("./Sidebar").then((mod) => mod.SidebarLink), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-5" />,
});

const SidebarContent = ({ links, prefix, pharmacyId }: SidebarProps & { pharmacyId?: string }) => {
  return (
    <ScrollArea className="h-full overflow-y-auto">
      <div className="flex h-screen flex-col">
        <nav className="flex flex-1 flex-col gap-y-8 p-6 text-lg font-medium">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
            <Logo />
          </Link>
          {links.map((section) => (
            <section key={section.title} className="flex flex-col gap-0.5">
              <p className="text-xs text-muted-foreground">{section.title}</p>
              {section.items.map((item) => (
                <SidebarLink key={`mobile-sidebar-` + item.href} prefix={prefix} isSidebarExpanded item={item} />
              ))}
            </section>
          ))}
          <section className="space-y-2 flex flex-col">
            <InstallPWAButton isSidebarExpanded={false} />
            {!!pharmacyId && (
              <Link className={buttonVariants({ variant: "outline" })} href="/pharmacy/create">
                Own A pharmacy?, Create One
              </Link>
            )}
          </section>
        </nav>
      </div>
    </ScrollArea>
  );
};

export default SidebarContent;
