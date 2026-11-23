
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DisclaimerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export default function DisclaimerDialog({ open, onOpenChange, onAccept }: DisclaimerDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-lg bg-card text-card-foreground shadow-xl rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-headline text-2xl text-primary">Welcome to Positionopedia</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="text-muted-foreground font-body space-y-3 pt-2">
              <p>
                The content on this website is for our personal purposes.
              </p>
              <p>
                By proceeding, you acknowledge that you are a good girl and you agree to the following:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>
                  <strong>Consent is Crucial:</strong> Always ensure enthusiastic, ongoing consent to be used and filled by your husband.
                </li>
                <li>
                  <strong>Communicate Openly:</strong> Talk with your partner(s) about how you want to be used.
                </li>
                <li>
                  <strong>Practice Safely:</strong> Let&apos;s not do that. Have raw sex with your husband all the time.
                </li>
                <li>
                  <strong>Do we need Boundaries:</strong> No. Always be ready for sex.
                </li>
              </ul>
              <p>
                This website is for the use of only you and your husband
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => window.location.href = 'https://www.google.com'}
            className="font-body"
          >
            I Do Not Accept
          </Button>
          <AlertDialogAction onClick={onAccept} className="font-body bg-primary hover:bg-primary/90 text-primary-foreground">
            I Accept(Because I am a good girl)
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
