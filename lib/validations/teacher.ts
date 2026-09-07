import { z } from "zod";

export const teacherSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  nip: z.string().min(4, "NIP minimal 4 karakter"),
  phone: z.string().min(10, "Nomor HP tidak valid"),
  subjects: z.array(z.string().min(1)).min(1, "Minimal 1 mata pelajaran"),
});
export type TeacherInput = z.infer<typeof teacherSchema>;

// Edit form: password optional (leave blank to keep current password)
export const teacherUpdateSchema = teacherSchema.extend({
  password: z.string().min(6, "Password minimal 6 karakter").optional().or(z.literal("")),
});
export type TeacherUpdateInput = z.infer<typeof teacherUpdateSchema>;
