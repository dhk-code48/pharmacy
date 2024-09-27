import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/Icons";
import { Prescription, Media } from "@prisma/client";
import dynamic from "next/dynamic";

const PrescriptionImages = dynamic(() => import("@/components/layout/PrescriptionImages"), {
  loading: () => <p>Loading images...</p>,
});

export default function ViewDialog({ prescription }: { prescription: Prescription & { images: Media[] } }) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "relative w-full justify-between hover:bg-accent hover:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground"
        )}
      >
        View
        <Icons.eye className="text-muted-foreground" size={18} />
      </DialogTrigger>
      <DialogContent>
        <PrescriptionImages images={prescription.images} />
      </DialogContent>
    </Dialog>
  );
}
