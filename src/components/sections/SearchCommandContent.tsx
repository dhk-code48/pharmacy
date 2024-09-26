"use client";
import React, { Dispatch, SetStateAction } from "react";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Icons } from "@/components/shared/Icons";
import { SidebarNavItem } from "@/types";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import useIsMounted from "@/hooks/useMounted";
const CommandContent = ({
  open,
  setOpen,
  links,
  prefix,
}: {
  prefix?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  links: SidebarNavItem[];
}) => {
  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  const path = usePathname();
  const router = useRouter();

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {links.map((section) => (
          <CommandGroup key={section.title} heading={section.title}>
            {section.items.map((item) => {
              const Icon = Icons[item.icon || "arrowRight"];
              const href = prefix + item.href;
              return (
                <CommandItem
                  key={item.title}
                  onSelect={() => {
                    runCommand(() => router.push(href as string));
                  }}
                  className={cn(path === href ? "bg-muted text-primary" : "text-muted-foreground hover:text-accent-foreground")}
                >
                  <Icon className="mr-2 size-5" />
                  {item.title}
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
};
export default CommandContent;
