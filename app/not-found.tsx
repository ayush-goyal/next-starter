import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto w-full max-w-md text-center">
        <div className="mb-8 flex flex-col items-center space-y-6">
          <div className="text-primary-foreground bg-primary inline-flex h-16 w-16 items-center justify-center rounded-full">
            <AlertCircle className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Oops!</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Button asChild variant="default" className="w-full sm:w-auto">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </main>
  );
}
