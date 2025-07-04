// components/ui/dropdown-delete-item.tsx

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
import { MdOutlineModeEdit } from "react-icons/md";

type DropdownEditItemProps = {
  onClick: () => void;
  children?: ReactNode;
};

export default function DropdownEditItem({
  onClick,
  children = "Edit name",
}: DropdownEditItemProps) {
  return (
    <DropdownMenuItem onClick={onClick}>
        <MdOutlineModeEdit className="w-4 h-4 text-white" /> {children}
    </DropdownMenuItem>
  );
}
