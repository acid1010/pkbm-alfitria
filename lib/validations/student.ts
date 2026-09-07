import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  nis: z.string().min(4, "NIS minimal 4 karakter"),
  classId: z.string().optional(),
  birthdate: z.string().min(1, "Tanggal lahir wajib diisi"),
  address: z.string().min(5, "Alamat terlalu pendek"),
  phone: z.string().min(10, "Nomor HP tidak valid"),
});
export type StudentInput = z.infer<typeof studentSchema>;

// Edit form: password optional (leave blank to keep current password)
export const studentUpdateSchema = studentSchema.extend({
  password: z.string().min(6, "Password minimal 6 karakter").optional().or(z.literal("")),
});
export type StudentUpdateInput = z.infer<typeof studentUpdateSchema>;
