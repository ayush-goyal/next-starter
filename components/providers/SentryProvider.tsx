"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import * as Sentry from "@sentry/nextjs";

interface SentryProviderProps {
  children: React.ReactNode;
}

export function SentryProvider({ children }: SentryProviderProps) {
  const { data: session } = authClient.useSession();

  // Set user context when session changes
  useEffect(() => {
    if (session?.user) {
      Sentry.setUser({
        id: session.user.id,
        email: session.user.email,
      });
    } else {
      Sentry.setUser(null);
    }
  }, [session]);

  return children;
}
