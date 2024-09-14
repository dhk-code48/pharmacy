import * as React from "react";
import Link from "next/link";

import { footerLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

import { Icons } from "@/components/shared/Icons";
import MaxWidthWrapper from "../shared/MaxWidthWrapper";
import { Button } from "../ui/button";

export function MarketingFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t", className)}>
      <div className="grid grid-cols-2 py-10 px-5 gap-5 lg:grid-cols-5 mx-auto container">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <span className="text-sm font-medium text-foreground">{section.title}</span>
            <ul className="mt-4 list-inside space-y-3">
              {section.items?.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-1 lg:col-span-2 grid justify-end items-center">
          <Button>Get Started</Button>
        </div>
      </div>

      <div className="text-center py-2 border-t">
        <span className="text-muted-foreground text-sm">Copyright &copy; 2024. All rights reserved.</span>
      </div>
    </footer>
  );
}
