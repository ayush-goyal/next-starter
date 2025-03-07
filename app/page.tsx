"use client";

import { authClient } from "@/lib/auth-client";
import { api } from "trpc/react";

export default function Home() {
  const { data, isLoading } = api.default.getHelloWorld.useQuery({
    name: "World",
  });

  const { data: sessionData, isPending: isAuthPending } =
    authClient.useSession();

  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-8 text-4xl font-semibold">Next.js Starter Template</h1>

      <section className="w-full max-w-md space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-medium">Hello World API</h3>
          <p className="text-muted-foreground mt-2">
            {isLoading ? "Loading..." : data}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-medium">Session Data</h3>
          <pre className="bg-muted mt-2 w-full overflow-auto rounded-md p-4 text-sm">
            {isAuthPending
              ? "Loading session..."
              : JSON.stringify(sessionData, null, 2)}
          </pre>
        </div>

        {sessionData?.user && (
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground">User is logged in</p>
          </div>
        )}
      </section>
    </main>
  );
}
