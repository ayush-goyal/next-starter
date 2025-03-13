import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/server/db";
import { sendPasswordResetEmail } from "./email";
import { env } from "@/env";

export const auth = betterAuth({
  basePath: "/api/auth", // Default auth route
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async (data) => {
      await sendPasswordResetEmail({
        to: data.user.email,
        resetLink: data.url,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
});

export type { Session } from "better-auth";
