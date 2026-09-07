"use client";
import { useTransition } from "react";
import { useFormStatus } from "react-dom";
import { FilePlus2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { requestDocumentAction } from "./actions";

const DOCUMENT_TYPES = [
  "Surat Keterangan Aktif",
  "Transkrip Nilai",
  "Surat Keterangan Lulus",
  "Ijazah Sementara",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-oxford-900 hover:bg-oxford-800">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FilePlus2 className="mr-2 h-4 w-4" />}
      Ajukan Dokumen
    </Button>
  );
}

export function DocumentRequestForm() {
  const [isPending, startTransition] = useTransition();

  const wrappedAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await requestDocumentAction(formData);
      if (result.success) {
        toast.success(result.message);
        (document.activeElement as HTMLFormElement | null)?.closest("form")?.reset();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form action={wrappedAction} className="grid max-w-xl gap-4">
      <label className="space-y-2 text-sm font-semibold text-oxford-800">
        Jenis Dokumen
        <select name="type" className="h-11 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm" required>
          {DOCUMENT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </label>
      <label className="space-y-2 text-sm font-semibold text-oxford-800">
        Catatan (opsional)
        <Input name="notes" maxLength={200} placeholder="Keperluan pengajuan" className="h-11 rounded-xl" />
      </label>
      <div>
        <SubmitButton />
      </div>
      {isPending ? null : null}
    </form>
  );
}

export function CancelDocumentButton({ documentId }: { documentId: string }) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      const { cancelDocumentAction } = await import("./actions");
      const result = await cancelDocumentAction(documentId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={onClick} disabled={isPending}>
      {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3 w-3" />} Batalkan
    </Button>
  );
}
