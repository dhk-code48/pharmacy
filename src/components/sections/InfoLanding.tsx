import Image from "next/image";
import { InfoLdg } from "@/types";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/Icons";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { infoStats } from "@/config/landing";

interface InfoLandingProps {
  data: InfoLdg;
  reverse?: boolean;
}

export default function InfoLanding({ data, reverse = false }: InfoLandingProps) {
  return (
    <div className="py-10 px-5 sm:py-20 space-y-10">
      <MaxWidthWrapper className="grid gap-10 px-2.5 lg:grid-cols-2 lg:items-center lg:px-7">
        <div className={cn(reverse ? "lg:order-2" : "lg:order-1")}>
          <h2 className="font-heading text-2xl text-foreground md:text-4xl lg:text-[40px]">{data.title}</h2>
          <p className="mt-4 text-base text-muted-foreground">{data.description}</p>
          <dl className="mt-6 space-y-4 leading-7">
            {data.list.map((item, index) => {
              const Icon = Icons[item.icon || "arrowRight"];
              return (
                <div className="relative pl-8" key={index}>
                  <dt className="font-semibold">
                    <Icon className="absolute left-0 top-1 size-5 stroke-purple-700" />
                    <span>{item.title}</span>
                  </dt>
                  <dd className="text-sm text-muted-foreground">{item.description}</dd>
                </div>
              );
            })}
          </dl>
        </div>
        <div className={cn("overflow-hidden rounded-xl border lg:-m-4", reverse ? "order-1" : "order-2")}>
          <div className="aspect-video">
            <Image className="size-full object-cover object-center" src={data.image} alt={data.title} width={1000} height={500} priority={true} />
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {infoStats.map((info, index) => {
          const Icon = Icons[info.icon];
          return (
            <div
              className="py-10 md:py-5 border hover:bg-accent text-muted-foreground hover:text-accent-foreground animate-fade-up transition-all select-none rounded-xl gap-2 items-center justify-center flex flex-col"
              key={"info-stats-" + index}
            >
              <Icon size={30} />

              <h1 className="text-3xl font-bold text-primary">{info.number}+ </h1>
              <p>{info.title}</p>
            </div>
          );
        })}
      </MaxWidthWrapper>
    </div>
  );
}
