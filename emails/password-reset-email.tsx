import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface PasswordResetEmailProps {
  resetLink: string;
}

export default function PasswordResetEmail({
  resetLink = "https://example.com/reset-password",
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password - Link expires in 1 hour</Preview>
      <Tailwind>
        <Body className="bg-gray-50 py-8" style={main}>
          <Container className="mx-auto max-w-[600px] rounded-lg border border-gray-200 bg-white p-10 shadow-sm">
            <Heading className="mt-0 text-center text-2xl font-bold text-gray-900">
              Password Reset
            </Heading>
            <Text className="my-4 text-base leading-6 text-gray-700">
              Hello,
            </Text>
            <Text className="my-4 text-base leading-6 text-gray-700">
              We received a request to reset your password. Use the button below
              to set a new password. This link is valid for 1 hour.
            </Text>
            <Section className="my-8 text-center">
              <Button
                href={resetLink}
                className="rounded-md bg-black px-5 py-3 text-center text-sm font-bold text-white no-underline"
              >
                Reset Password
              </Button>
            </Section>
            <Text className="my-4 text-base leading-6 text-gray-700">
              If you didn't request a password reset, you can safely ignore this
              email.
            </Text>
            <Hr className="my-6 border-gray-200" />
            <Text className="text-sm text-gray-500">
              If the button doesn't work, copy and paste this link into your
              browser:{" "}
              <Link href={resetLink} className="text-blue-500 underline">
                {resetLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const main = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};
