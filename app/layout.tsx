import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { TRPCReactProvider } from "trpc/react";
import * as Sentry from "@sentry/nextjs";

import { SentryProvider } from "@/components/providers/SentryProvider";
import { PostHogProvider } from "@/components/providers/PostHogProvider";

export function generateMetadata(): Metadata {
  return {
    title: "Next App",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    other: {
      ...Sentry.getTraceData(),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <TRPCReactProvider>
            <SentryProvider>
              <PostHogProvider>{children}</PostHogProvider>
            </SentryProvider>
          </TRPCReactProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
