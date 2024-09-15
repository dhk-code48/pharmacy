import React from "react";
import usePWAInstall from "@/hooks/usePwaInstall";
import { Button } from "@/components/ui/button";
import { Icons } from "./Icons";

const InstallPWAButton: React.FC<{ isSidebarExpanded: boolean }> = ({ isSidebarExpanded }) => {
  const { isInstallable, handleInstallClick } = usePWAInstall();

  if (!isInstallable) return null;

  return (
    <Button onClick={handleInstallClick} className="gap-2" size={isSidebarExpanded ? "default" : "icon"}>
      <Icons.pcInstall size={18} className="hidden lg:block" />
      <Icons.ipadInstall size={18} className="hidden md:block lg:hidden" />
      <Icons.mobileInstall size={18} className="block md:hidden" />
      {isSidebarExpanded && <span>Install App</span>}
    </Button>
  );
};

export default InstallPWAButton;
