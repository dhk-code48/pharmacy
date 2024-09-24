import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";
import { Checkbox } from "../ui/checkbox";

const ThemePreview = ({ type }: { type: "light" | "dark" | "system" }) => {
  const { setTheme, theme } = useTheme();
  return (
    <div className="border z-10 rounded overflow-hidden cursor-pointer relative" onClick={() => setTheme(type)}>
      <div className="absolute bottom-0 left-1">
        <Checkbox checked={theme === type} />
      </div>
      {/* Light/Dark theme split view for system theme */}
      {type === "system" ? (
        <div className={cn("group flex w-[120px]")}>
          <div className={cn("group flex w-[60px] items-end pl-6 pt-6 bg-gray-50")}>
            <div
              className={cn(
                "flex h-[56px] flex-1 rounded-tl-lg border-l border-t pl-2 pt-2 text-lg font-medium duration-200 ease-out group-hover:scale-110",
                "border-neutral-300 bg-neutral-200 text-gray-800"
              )}
            >
              Aa
            </div>
          </div>{" "}
          <div className={cn("group flex w-[60px] items-end pl-6 pt-6 bg-neutral-800")}>
            <div
              className={cn(
                "flex h-[56px] flex-1 rounded-tr-lg border-t pl-2 pt-2 text-lg font-medium duration-200 ease-out group-hover:scale-110",
                "border-neutral-700 bg-neutral-800 text-gray-200"
              )}
            >
              Aa
            </div>
          </div>
        </div>
      ) : (
        <div className={cn("group flex w-[120px] items-end pl-6 pt-6", type === "dark" && "bg-neutral-900", type === "light" && "bg-neutral-50")}>
          <div
            className={cn(
              "flex h-[56px] flex-1 rounded-tl-lg border-l border-t pl-2 pt-2 text-lg font-medium duration-200 ease-out group-hover:scale-110",
              type === "dark" && "border-neutral-700 bg-neutral-800 text-gray-200",
              type === "light" && "border-neutral-300 bg-neutral-200 text-gray-800"
            )}
          >
            Aa
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePreview;
