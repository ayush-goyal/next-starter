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

interface EmailVerificationEmailProps {
  verificationLink: string;
}

export default function EmailVerificationEmail({
  verificationLink = "https://example.com/verify-email",
}: EmailVerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Tailwind>
        <Body className="bg-gray-50 py-8" style={main}>
          <Container className="mx-auto max-w-[600px] rounded-lg border border-gray-200 bg-white p-10 shadow-sm">
            <Heading className="mt-0 text-center text-2xl font-bold text-gray-900">
              Verify Your Email
            </Heading>
            <Text className="my-4 text-base leading-6 text-gray-700">
              Hello,
            </Text>
            <Text className="my-4 text-base leading-6 text-gray-700">
              Thanks for signing up! Please verify your email address by
              clicking the button below. This link will expire in 24 hours.
            </Text>
            <Section className="my-8 text-center">
              <Button
                href={verificationLink}
                className="rounded-md bg-black px-5 py-3 text-center text-sm font-bold text-white no-underline"
              >
                Verify Email
              </Button>
            </Section>
            <Text className="my-4 text-base leading-6 text-gray-700">
              If you didn't create an account, you can safely ignore this email.
            </Text>
            <Hr className="my-6 border-gray-200" />
            <Text className="text-sm text-gray-500">
              If the button doesn't work, copy and paste this link into your
              browser:{" "}
              <Link href={verificationLink} className="text-blue-500 underline">
                {verificationLink}
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
