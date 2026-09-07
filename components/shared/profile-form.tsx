"use client";
import { useTransition } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type ProfileFormProps = {
  mode: "SISWA" | "GURU";
  action: (formData: FormData) => Promise<{ success: boolean; message: string }>;
  defaults: {
    name: string;
    phone: string;
    address?: string;
  };
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-oxford-900 hover:bg-oxford-800">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Simpan Perubahan
    </Button>
  );
}

export function ProfileForm({ mode, action, defaults }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  // Wrapped so we can toast on the typed result
  const wrappedAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await action(formData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form action={wrappedAction} className="grid max-w-xl gap-4">
      <label className="space-y-2 text-sm font-semibold text-oxford-800">
        Nama Lengkap
        <Input name="name" defaultValue={defaults.name} className="h-11 rounded-xl" required />
      </label>
      <label className="space-y-2 text-sm font-semibold text-oxford-800">
        No. HP
        <Input name="phone" defaultValue={defaults.phone} className="h-11 rounded-xl" required />
      </label>
      {mode === "SISWA" && (
        <label className="space-y-2 text-sm font-semibold text-oxford-800">
          Alamat
          <Input name="address" defaultValue={defaults.address ?? ""} className="h-11 rounded-xl" required />
        </label>
      )}
      <fieldset className="rounded-xl border border-oxford-100 p-4">
        <legend className="px-2 text-sm font-semibold text-oxford-800">Ganti Password (opsional)</legend>
        <div className="grid gap-4">
          <label className="space-y-2 text-sm font-medium text-oxford-700">
            Password Saat Ini
            <Input name="currentPassword" type="password" className="h-11 rounded-xl" autoComplete="current-password" />
          </label>
          <label className="space-y-2 text-sm font-medium text-oxford-700">
            Password Baru (minimal 6 karakter)
            <Input name="newPassword" type="password" minLength={6} className="h-11 rounded-xl" autoComplete="new-password" />
          </label>
        </div>
      </fieldset>
      <div>
        <SubmitButton />
      </div>
      {/* isPending kept referenced to satisfy lint on unused transition state */}
      {isPending ? null : null}
    </form>
  );
}
