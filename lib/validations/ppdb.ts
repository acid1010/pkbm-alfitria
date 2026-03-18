import { z } from "zod";

export const ppdbSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  birthdate: z.string().min(1, "Tanggal lahir wajib diisi"),
  address: z.string().min(10, "Alamat terlalu pendek"),
  phone: z.string().min(10, "Nomor HP tidak valid"),
  documents: z.array(z.string()).min(1, "Minimal 1 dokumen diunggah"),
});

export type PpdbInput = z.infer<typeof ppdbSchema>;
