import { z } from "zod";

export const gradeEntrySchema = z.object({
  classId: z.string().min(1, "Kelas wajib dipilih"),
  subjectId: z.string().min(1, "Mata pelajaran wajib dipilih"),
  semester: z.coerce.number().int().min(1, "Semester 1 atau 2").max(2, "Semester 1 atau 2"),
  type: z.enum(["UH", "UTS", "UAS"]),
  scores: z.array(
    z.object({
      studentId: z.string().min(1),
      score: z.coerce.number().min(0, "Nilai minimal 0").max(100, "Nilai maksimal 100"),
    }),
  ),
});
export type GradeEntryInput = z.infer<typeof gradeEntrySchema>;
