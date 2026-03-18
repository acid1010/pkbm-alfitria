import type { NextAuthConfig } from "next-auth";
import type { AppRole } from "@/types/auth";

const roleByPrefix: Record<string, AppRole> = {
  "/siswa": "SISWA",
  "/guru": "GURU",
  "/admin": "ADMIN",
};

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [], // added in auth.ts
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const pathName = nextUrl.pathname;
      const matchedPrefix = Object.keys(roleByPrefix).find((prefix) =>
        pathName.startsWith(prefix)
      );

      if (!matchedPrefix) {
        return true;
      }

      if (!auth?.user) {
        return false;
      }

      return auth.user.role === roleByPrefix[matchedPrefix];
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role as AppRole;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as AppRole;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
