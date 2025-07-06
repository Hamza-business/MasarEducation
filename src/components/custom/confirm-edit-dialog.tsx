// components/ui/edit-dialog.tsx
"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReactNode, useState, useEffect } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  defaultValue: string;
  onSubmit: (newName: string) => void;
};

export default function EditDialog({
  children,
  title = "Edit name",
  description = "Update the name below.",
  confirmText = "Save",
  defaultValue,
  onSubmit,
}: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(defaultValue);

  useEffect(() => {
    if (open) {
      setName(defaultValue); // Reset name when dialog opens
    }
  }, [open, defaultValue]);

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New name"
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="bg-blue-600 text-white">
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
