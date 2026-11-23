"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary caught an error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="max-w-md w-full bg-card border border-border rounded-lg shadow-lg p-6 text-center space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
        <h2 className="text-2xl font-headline text-primary">Something went wrong</h2>
        <p className="text-sm font-body text-muted-foreground">
          An unexpected error occurred while rendering this page. Details have been logged.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button onClick={() => reset()} className="font-body">
            <RotateCcw className="mr-2 h-4 w-4" /> Try again
          </Button>
          <Button asChild variant="outline" className="font-body">
            <Link href="/library">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
