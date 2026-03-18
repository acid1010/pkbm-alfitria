"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

type QuickActionProps = {
  schoolYear: string;
};

export function AdminQuickActions({ schoolYear }: QuickActionProps) {
  const [semester, setSemester] = useState("1");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Aksi Cepat</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pengaturan Semester Aktif</DialogTitle>
          <DialogDescription>Atur semester aktif untuk tahun ajaran {schoolYear}.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p className="text-sm text-slate-600">Pilih semester:</p>
          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Semester 1</SelectItem>
              <SelectItem value="2">Semester 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              toast.success(`Semester ${semester} berhasil dipilih`);
            }}
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
