import { z } from "zod";

export const studentProfileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  address: z.string().min(5, "Alamat terlalu pendek"),
  phone: z.string().min(10, "Nomor HP tidak valid"),
  currentPassword: z.string().optional().or(z.literal("")),
  newPassword: z.string().min(6, "Password baru minimal 6 karakter").optional().or(z.literal("")),
}).refine(
  (data) => !data.newPassword || (data.currentPassword ?? "").length > 0,
  { message: "Masukkan password saat ini untuk mengganti password", path: ["currentPassword"] },
);
export type StudentProfileInput = z.infer<typeof studentProfileSchema>;

export const teacherProfileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  phone: z.string().min(10, "Nomor HP tidak valid"),
  currentPassword: z.string().optional().or(z.literal("")),
  newPassword: z.string().min(6, "Password baru minimal 6 karakter").optional().or(z.literal("")),
}).refine(
  (data) => !data.newPassword || (data.currentPassword ?? "").length > 0,
  { message: "Masukkan password saat ini untuk mengganti password", path: ["currentPassword"] },
);
export type TeacherProfileInput = z.infer<typeof teacherProfileSchema>;
