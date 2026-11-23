"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DisclaimerDialog from '@/components/DisclaimerDialog';
import { Loader2 } from 'lucide-react';

const DISCLAIMER_ACCEPTED_KEY = 'disclaimerAcceptedPositionopedia';

export default function HomePage() {
  const router = useRouter();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getDisclaimerAccepted = (): boolean => {
    try {
      return localStorage.getItem(DISCLAIMER_ACCEPTED_KEY) === 'true';
    } catch (error) {
      console.error('Failed to read disclaimer status from localStorage:', error);
      return false;
    }
  };

  useEffect(() => {
    try {
      if (getDisclaimerAccepted()) {
        router.replace('/library');
      } else {
        setShowDisclaimer(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error during disclaimer initialization:', error);
      setShowDisclaimer(true);
      setIsLoading(false);
    }
  }, [router]);

  const handleAcceptDisclaimer = () => {
    try {
      localStorage.setItem(DISCLAIMER_ACCEPTED_KEY, 'true');
    } catch (error) {
      console.error('Failed to persist disclaimer acceptance to localStorage:', error);
    }
    setShowDisclaimer(false);
    router.push('/library');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg font-body">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <DisclaimerDialog
        open={showDisclaimer}
        onOpenChange={(open) => {
          const accepted = getDisclaimerAccepted();
          if (!open && !accepted) {
            // Prevent closing via escape key or overlay click unless accepted
            setShowDisclaimer(true);
          } else if (!open && accepted) {
            setShowDisclaimer(false); // Allow close if already accepted and re-opened somehow
          }
        }}
        onAccept={handleAcceptDisclaimer}
      />
      {!showDisclaimer && !isLoading && (
         <div className="text-center">
            <p className="mt-4 text-lg font-body">Redirecting to library...</p>
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mt-2" />
         </div>
      )}
    </div>
  );
}
