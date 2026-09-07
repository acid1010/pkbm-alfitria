import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(3, "Nama kelas minimal 3 karakter"),
  grade: z.coerce.number().int("Tingkat harus angka bulat").min(1, "Tingkat minimal 1").max(13, "Tingkat maksimal 13"),
  year: z.string().regex(/^\d{4}\/\d{4}$/, "Format tahun ajaran: 2025/2026"),
  teacherId: z.string().optional(),
});
export type ClassInput = z.infer<typeof classSchema>;

export const subjectSchema = z.object({
  name: z.string().min(3, "Nama mata pelajaran minimal 3 karakter"),
  code: z.string().min(2, "Kode minimal 2 karakter").max(10, "Kode maksimal 10 karakter"),
  teacherId: z.string().optional(),
});
export type SubjectInput = z.infer<typeof subjectSchema>;
