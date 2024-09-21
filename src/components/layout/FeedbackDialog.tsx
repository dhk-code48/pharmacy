import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { SidebarLink } from "./Sidebar";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Icons } from "../shared/Icons";
import { cn } from "@/lib/utils";
import FeedBackForm from "../forms/FeedBackForm";

const FeedbackDialog = ({ isSidebarExpanded }: { isSidebarExpanded: boolean }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size={isSidebarExpanded ? "default" : "icon"}
          className={cn("text-muted-foreground", isSidebarExpanded ? "justify-start" : "justify-center")}
        >
          <Icons.message className="size-4" />
          {isSidebarExpanded && "Feedback"}
        </Button>
      </DialogTrigger>
      <DialogContent className="!z-40">
        <FeedBackForm />
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
