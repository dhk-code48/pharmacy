"use client";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}
const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("text-lg font-semibold", className)}>
      <h1>Company Logo</h1>
    </div>
  );
};

export default Logo;
