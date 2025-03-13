import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "server/db";

export const auth = betterAuth({
  basePath: "/api/auth", // Default auth route
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "users",
  },
  session: {
    modelName: "sessions",
  },
  account: {
    modelName: "accounts",
  },
  verification: {
    modelName: "verifications",
  },
});

export type { Session } from "better-auth";
