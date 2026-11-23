"use client";

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import AppShell from '@/components/AppShell';
import { positionsData } from '@/data/positions';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, ShieldCheck, Zap, StretchHorizontal, Heart, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function PositionDetailPage() {
  const params = useParams<{ id: string }>();
  const positionId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const position = positionsData.find(p => p.id === positionId);

  useEffect(() => {
    if (!position) {
      console.error(`Position not found for id: "${positionId ?? ''}"`);
    }
  }, [position, positionId]);

  if (!position) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <Info className="mx-auto h-16 w-16 text-destructive mb-4" />
          <h1 className="text-3xl font-headline text-destructive mb-2">Position Not Found</h1>
          <p className="font-body text-muted-foreground mb-6">
            The position you are looking for does not exist or may have been moved.
          </p>
          <Button asChild variant="outline">
            <Link href="/library" className="font-body">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
            </Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="outline" className="mb-6 font-body">
          <Link href="/library">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
          </Link>
        </Button>

        <Card className="overflow-hidden shadow-xl border-border bg-card">
          <CardHeader className="p-0">
            <div className="relative w-full h-64 sm:h-80 md:h-96">
              <Image
                src={position.imageUrl}
                alt={position.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                priority
                data-ai-hint={position.dataAiHint}
                onError={(e) => {
                  console.error(`Failed to load image for position "${position.name}" (${position.imageUrl}):`, e);
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <h1 className="text-3xl sm:text-4xl font-headline text-primary mb-1">{position.name}</h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">{position.description}</p>

            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="secondary" className="text-sm px-3 py-1 font-body">{position.category}</Badge>
              {position.allowsAnal && (
                <Badge variant="outline" className="text-sm px-3 py-1 font-body border-accent text-accent-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" /> Anal Compatible
                </Badge>
              )}
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-secondary/30 rounded-md">
                <Zap className="h-6 w-6 mx-auto mb-1 text-primary" />
                <h3 className="font-headline text-sm font-semibold text-foreground">Intensity</h3>
                <p className="font-body text-sm text-muted-foreground">{position.intensity}</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-md">
                <StretchHorizontal className="h-6 w-6 mx-auto mb-1 text-primary" />
                <h3 className="font-headline text-sm font-semibold text-foreground">Flexibility</h3>
                <p className="font-body text-sm text-muted-foreground">{position.flexibility}</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-md">
                <Heart className="h-6 w-6 mx-auto mb-1 text-primary" />
                <h3 className="font-headline text-sm font-semibold text-foreground">Intimacy</h3>
                <p className="font-body text-sm text-muted-foreground">{position.intimacy}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-headline text-primary mb-3">Step-by-Step Guide</h2>
              <ul className="list-decimal list-outside pl-5 space-y-2 font-body text-foreground">
                {position.guide.map((step, index) => (
                  <li key={index} className="leading-relaxed">{step}</li>
                ))}
              </ul>
            </div>

            <Separator />
            
            <div>
              <h2 className="text-2xl font-headline text-primary mb-3">Anatomical Insights</h2>
              <p className="font-body text-foreground leading-relaxed">{position.anatomicalInsights}</p>
              {position.allowsAnal && (
                 <p className="font-body text-sm text-amber-700 dark:text-amber-500 mt-3 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-md">
                    <strong>Important for Anal Play:</strong> Always use generous amounts of quality lubricant. Communicate constantly with your partner about comfort and sensations. Start slowly and gently. If there's any pain, stop and reassess.
                 </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
