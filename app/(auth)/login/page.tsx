import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Login",
};

const portalByRole = { GURU: "/guru", SISWA: "/siswa", ADMIN: "/admin" } as const;

export default async function LoginPage() {
  const session = await auth();
  const role = session?.user?.role;
  if (role && role in portalByRole) {
    redirect(portalByRole[role]);
  }
  return <LoginForm />;
}
