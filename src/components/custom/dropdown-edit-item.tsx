// components/common/dropdown-edit-item.tsx
"use client";

import { Pencil } from "lucide-react";
import EditDialog from "@/components/custom/confirm-edit-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  currentName: string;
  itemName?: string;
  onEdit: (newName: string) => void;
  children?: string;
};

export default function DropdownEditItem({
  currentName,
  itemName = "item",
  onEdit,
  children = "Edit",
}: Props) {
  return (
    <EditDialog
      defaultValue={currentName}
      onSubmit={onEdit}
      title={`Edit ${itemName}`}
      description={`Change the name of this ${itemName.toLowerCase()}.`}
    >
      <Button
        className="text-blue-600 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white gap-2 w-full h-8 mt-0 bg-transparent flex justify-start"
      >
        <Pencil className="w-4 h-4" />
        {children}
      </Button>
    </EditDialog>
  );
}
