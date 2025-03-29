import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/server/db";
import { sendPasswordResetEmail } from "./email";
import { env } from "@/env";
import { stripe, stripePlans } from "./stripe";
import { stripe as stripePlugin } from "@better-auth/stripe";

export const auth = betterAuth({
  basePath: "/api/auth", // Default auth route
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail({
        to: user.email,
        resetLink: url,
      });
    },
  },
  plugins: [
    stripePlugin({
      stripeClient: stripe,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET ?? "",
      createCustomerOnSignUp: false,
      schema: {
        subscription: {
          modelName: "subscriptions",
        },
      },
      subscription: {
        enabled: true,
        plans: stripePlans,
        requireEmailVerification: true,
      },
    }),
  ],
  socialProviders:
    env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          },
        }
      : undefined,
});

export type { Session } from "better-auth";
