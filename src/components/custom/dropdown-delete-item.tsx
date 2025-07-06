import { Trash2 } from "lucide-react";
import ConfirmDeleteDialog from "@/components/custom/confirm-delete-dialog";
import { ReactNode } from "react";
import { Button } from "../ui/button";

type Props = {
  onConfirm: () => void;
  children?: ReactNode;
};

export default function DropdownDeleteItem({ onConfirm, children = "Delete" }: Props) {
  return (
    <ConfirmDeleteDialog
      onConfirm={onConfirm}
      description="Are you sure you want to delete this item? This action cannot be undone."
    >
        <Button
          className="text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white gap-2 w-full zeft h-8 mt-0 bg-transparent flex justify-start"
        >
            <Trash2/>
            {children} 
        </Button>
    </ConfirmDeleteDialog>
  );
}
