"use client";
import { SidebarLinks } from "@/types";
import { Icons } from "../shared/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const BottomTab = ({ links, prefix = "", action }: { links: SidebarLinks[]; prefix?: string; action?: React.ReactNode }) => {
  const pathName = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t shadow-lg z-50">
      <div className="flex justify-around py-2 items-center h-full">
        {links.map((link, index) => {
          const Icon = Icons[link.icon || "arrowRight"];
          const href = prefix + link.href;
          const isActive = pathName === href;
          return (
            <Link
              key={"bottom-tab-" + index}
              href={href}
              className={cn("flex font-semibold flex-col items-center text-gray-600 hover:text-primary", isActive && "text-blue-500")}
            >
              <Icon size={18} />
              <span className="text-xs">{link.title}</span>
            </Link>
          );
        })}
        {action}
      </div>
    </nav>
  );
};

export default BottomTab;
