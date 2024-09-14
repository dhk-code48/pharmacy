import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

export default async function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <Link
          href="https://twitter.com/miickasmt/status/1810465801649938857"
          className={cn(buttonVariants({ variant: "outline", size: "sm", className: "rounded-full" }), "px-4")}
          target="_blank"
        >
          <span className="mr-3">🎉</span>
          <span className="hidden md:flex">Introducing&nbsp;</span> Push notifications for pharmacies and users{" "}
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Your Health <span className="text-gradient_indigo-purple font-extrabold">Our Priority</span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Get your medicines from your nearest pharmacy at your door steps just by uploading prescriptions
        </p>

        <div className="flex justify-center space-x-2 md:space-x-4" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
          <Link href="/login" prefetch={true} className={cn(buttonVariants({ size: "lg", className: "rounded-full" }), "gap-2")}>
            <span>Upload Prescription</span>
            <Icons.arrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
