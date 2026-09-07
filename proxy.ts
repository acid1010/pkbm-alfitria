import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// ponytail: named `proxy` export is the v16 convention; keep NextAuth's `.auth` handler
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/siswa/:path*", "/guru/:path*", "/admin/:path*"],
};
