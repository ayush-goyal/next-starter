import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { TRPCReactProvider } from "trpc/react";
import { SentryProvider } from "@/components/providers/SentryProvider";
import { PostHogProvider } from "@/components/providers/PostHogProvider";

export const metadata: Metadata = {
  title: "Next App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

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
