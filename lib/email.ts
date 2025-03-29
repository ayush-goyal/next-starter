import { Resend } from "resend";
import { env } from "@/env";
import PasswordResetEmail from "@/emails/password-reset-email";
import { render } from "@react-email/components";
import EmailVerificationEmail from "@/emails/email-verification-email";
import { type JSX } from "react";

const resend = new Resend(env.RESEND_API_KEY);

const FROM_EMAIL = "Company Name <support@transactional.example.com>";

export async function sendEmail<T extends (props: any) => JSX.Element>({
  to,
  subject,
  component: Component,
  props,
}: {
  to: string;
  subject: string;
  component: T;
  props: T extends (props: infer P) => JSX.Element ? P : never;
}) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    react: Component(props),
    text: await render(Component(props), { plainText: true }),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const sendPasswordResetEmail = async ({
  to,
  resetLink,
}: {
  to: string;
  resetLink: string;
}) => {
  return sendEmail({
    to,
    subject: "Reset your password",
    component: PasswordResetEmail,
    props: { resetLink },
  });
};

export const sendVerificationEmail = async ({
  to,
  verificationLink,
}: {
  to: string;
  verificationLink: string;
}) => {
  return sendEmail({
    to,
    subject: "Verify your email",
    component: EmailVerificationEmail,
    props: { verificationLink },
  });
};
