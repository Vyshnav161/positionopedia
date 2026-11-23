"use client";

import type { Position } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PositionCardProps {
  position: Position;
}

export default function PositionCard({ position }: PositionCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border-border bg-card">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={position.imageUrl}
            alt={position.name}
            fill
            referrerPolicy="no-referrer"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={position.dataAiHint}
            onError={(e) => {
              console.error(`Failed to load card image for position "${position.name}" (${position.imageUrl}):`, e);
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline text-primary mb-1">{position.name}</CardTitle>
        <div className="flex flex-wrap gap-2 my-2">
          <Badge variant="secondary" className="font-body">{position.category}</Badge>
          {position.allowsAnal && (
            <Badge variant="outline" className="font-body border-accent text-accent-foreground flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Anal Compatible
            </Badge>
          )}
        </div>
        <CardDescription className="font-body text-sm text-muted-foreground line-clamp-3">{position.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="link" className="p-0 h-auto text-primary hover:text-primary/80 font-body">
          <Link href={`/positions/${position.id}`} className="flex items-center">
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
