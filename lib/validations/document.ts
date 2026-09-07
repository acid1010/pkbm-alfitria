import { z } from "zod";

export const documentRequestSchema = z.object({
  type: z.enum(
    ["Surat Keterangan Aktif", "Transkrip Nilai", "Surat Keterangan Lulus", "Ijazah Sementara"],
    { message: "Jenis dokumen tidak valid" },
  ),
  notes: z.string().max(200, "Catatan maksimal 200 karakter").optional().or(z.literal("")),
});
export type DocumentRequestInput = z.infer<typeof documentRequestSchema>;
