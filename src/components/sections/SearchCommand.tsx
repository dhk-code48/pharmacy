"use client";

import { SidebarNavItem } from "@/types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";
import dynamic from "next/dynamic";

const SearchCommandContent = dynamic(() => import("./SearchCommandContent"));

export function SearchCommand({ prefix, links }: { links: SidebarNavItem[]; prefix: string }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-md bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-72"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">
          Search
          <span className="hidden sm:inline-flex">&nbsp;everything</span>...
        </span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.45rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      {open && <SearchCommandContent prefix={prefix} links={links} open={open} setOpen={setOpen} />}
    </>
  );
}
