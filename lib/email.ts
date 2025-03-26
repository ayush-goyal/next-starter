import { Resend } from "resend";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export const sendPasswordResetEmail = async ({
  to,
  resetLink,
}: {
  to: string;
  resetLink: string;
}) => {
  await resend.emails.send({
    from: "noreply@yourdomain.com",
    to,
    subject: "Reset your password",
    html: `
      <h1>Reset Your Password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
  });
};
