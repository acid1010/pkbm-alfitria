"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validations/auth";

export type LoginState = {
  error?: string;
};

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };
  }

  if (!rateLimit(`login:${parsed.data.username}`, 5, 5 * 60 * 1000)) {
    return { error: "Terlalu banyak percobaan. Coba lagi dalam beberapa menit." };
  }

  try {
    await signIn("credentials", {
      username: parsed.data.username,
      password: parsed.data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Username atau password salah." };
    }

    throw error;
  }

  // ponytail: DB lookup instead of auth() — on serverless the freshly-set session
  // cookie isn't readable in the same action, so auth() returns null and misroutes.
  const user = await prisma.user.findUnique({
    where: { username: parsed.data.username },
    select: { role: true },
  });
  redirect(user?.role === "GURU" ? "/guru" : user?.role === "SISWA" ? "/siswa" : "/admin");
}
