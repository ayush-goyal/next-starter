import { Resend } from "resend";
import { env } from "@/env";
import PasswordResetEmail from "@/emails/password-reset-email";
import { render } from "@react-email/components";

const resend = new Resend(env.RESEND_API_KEY);

export const sendPasswordResetEmail = async ({
  to,
  resetLink,
}: {
  to: string;
  resetLink: string;
}) => {
  const { data, error } = await resend.emails.send({
    from: "Company Name <support@transactional.example.com>",
    to,
    subject: "Reset your password",
    react: PasswordResetEmail({ resetLink }),
    text: await render(PasswordResetEmail({ resetLink }), { plainText: true }),
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
};
