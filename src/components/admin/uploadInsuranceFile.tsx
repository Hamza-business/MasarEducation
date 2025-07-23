'user client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateInsuranceOrderStatus, uploadInsuranceFile } from '@/lib/insuranceOrder';
import { orderApprovedEmail } from '@/lib/emails';

const statusOptions = ["Pending", "Under review", "Rejected", "Completed"] as const;

type Status = (typeof statusOptions)[number];

interface Props {
  orderId: number;
  orderUserEmail: string;
  orderUserName: string;
  orderTrackCode: string;
  onStatusUpdated?: () => void;
}

export default function OrderStatusForm({ orderId, onStatusUpdated, orderTrackCode, orderUserEmail, orderUserName  }: Props) {
  const [status, setStatus] = useState("Pending");
  const [rejectionReason, setRejectionReason] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (status === "Rejected") {
        await updateInsuranceOrderStatus(orderId, "rejected", rejectionReason);
      } else if (status === "Completed") {
        for (const file of files) {
          await uploadInsuranceFile(orderId, file);
        }
        await updateInsuranceOrderStatus(orderId, "completed");
        await orderApprovedEmail(orderUserEmail, orderUserName, orderTrackCode)
      } else if (status === "Pending")  {
        await updateInsuranceOrderStatus(orderId, "pending");
      } else if (status === "Under review")  {
        await updateInsuranceOrderStatus(orderId, "under review");
      }

      setSuccess(true);
      onStatusUpdated?.();
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Status Dropdown */}
      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          className="w-full border rounded-md px-3 py-2"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Rejection Message */}
      {status === "Rejected" && (
        <div>
          <Label>Rejection Reason</Label>
          <Textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter reason for rejection"
          />
        </div>
      )}

      {/* Completed – Upload Files */}
      {status === "Completed" && (
        <div>
          <Label>Insurance Files</Label>
          <Input
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => {
              if (e.target.files) setFiles(Array.from(e.target.files));
            }}
          />
          <div className="text-sm text-muted-foreground mt-1">
            {files.length > 0 ? `${files.length} file(s) selected` : "No files selected"}
          </div>
        </div>
      )}

      {/* Submit */}
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>

      {success && (
        <div className="text-green-600 font-medium">Status updated successfully.</div>
      )}
    </div>
  );
}
