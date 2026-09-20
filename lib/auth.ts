import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { isDatabaseConfigured } from "@/lib/db-config";
import { authConfig } from "./auth.config";

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!isDatabaseConfigured) {
          return null;
        }

        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        try {
          const { prisma } = await import("@/lib/prisma");

          const user = await prisma.user.findUnique({
            where: { username: parsed.data.username },
          });

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(parsed.data.password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth authorize failed:", error);
          return null;
        }
      },
    }),
  ],
});
