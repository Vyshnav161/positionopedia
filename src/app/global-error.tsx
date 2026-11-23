"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error boundary caught an error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="font-body antialiased bg-background text-foreground">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-card border border-border rounded-lg shadow-lg p-6 text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-2xl font-headline text-primary">Application Error</h2>
            <p className="text-sm text-muted-foreground">
              A critical error occurred. Details have been logged to the console.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
