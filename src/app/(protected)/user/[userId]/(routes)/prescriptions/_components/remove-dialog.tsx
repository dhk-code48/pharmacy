import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/shared/Icons";
import { toast } from "sonner";
import deletePrescription from "@/actions/user/deletePrescription";

export default function DeleteMenuItem({ prescriptionId }: { prescriptionId: number }) {
  async function onDelete(id: number) {
    const isDelete = confirm("Do you really want to delete this prescription");
    if (isDelete) {
      toast.promise(deletePrescription(id), {
        loading: "Deleting Prescription...",
        success: "Successfully deleted Prescription",
        error: "Prescription cannot be deleted, if linked to order",
      });
    }
  }

  return (
    <DropdownMenuItem className="text-red-600 bg-destructive/30" onClick={() => onDelete(prescriptionId)}>
      Remove
      <DropdownMenuShortcut>
        <Icons.delete size={18} />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
