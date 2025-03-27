import "server-only";
import { PostHog } from "posthog-node";
import { env } from "@/env";

export default function PostHogClient() {
  if (!env.NEXT_PUBLIC_POSTHOG_KEY || !env.NEXT_PUBLIC_POSTHOG_HOST) {
    return null;
  }
  // Because server-side functions in Next.js can be short-lived, we set flushAt to 1, and flushInterval to 0.
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
}
