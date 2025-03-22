"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <head />
      <body>
        <ThemeProvider attribute="class">
          <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-12">
            <div className="space-y-3 text-center">
              <div className="text-destructive border-destructive/20 bg-destructive/10 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
                <XCircle className="mr-2 h-4 w-4" />
                Error
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight">
                Oops! Something went wrong
              </h1>
              <p className="text-muted-foreground mx-auto max-w-[500px] text-lg">
                An unexpected error occurred. We've been notified and are
                looking into it.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="mt-8 w-full max-w-[700px]">
                <div className="bg-muted/50 overflow-auto rounded-lg border p-4 font-mono text-sm">
                  <div className="text-destructive mb-2">{error.message}</div>
                  <div className="text-muted-foreground font-mono text-xs whitespace-pre-wrap">
                    {error.stack}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="h-10 px-6"
              >
                Refresh Page
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
