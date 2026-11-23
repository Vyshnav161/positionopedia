"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GalleryVerticalEnd, SlidersHorizontal, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/library', label: 'Library', icon: GalleryVerticalEnd },
  { href: '/generator', label: 'Generator', icon: SlidersHorizontal },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/library" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity" onClick={() => setIsSheetOpen(false)}>
              <Info className="h-7 w-7 sm:h-8 sm:w-8" />
              <h1 className="text-xl sm:text-2xl font-headline font-semibold tracking-tight">Positionopedia</h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium font-body transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <link.icon className="inline-block h-4 w-4 mr-1.5 align-text-bottom" />
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs bg-card p-6">
                  <div className="flex flex-col space-y-4">
                  <Link href="/library" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-4" onClick={() => setIsSheetOpen(false)}>
                    <Info className="h-7 w-7" />
                    <h1 className="text-xl font-headline font-semibold">Positionopedia</h1>
                  </Link>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsSheetOpen(false)}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-base font-medium font-body transition-colors",
                          pathname === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        <link.icon className="h-5 w-5 mr-3" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="py-8 text-center border-t border-border bg-card">
        <p className="text-sm text-muted-foreground font-body">
          &copy; {new Date().getFullYear()} Positionopedia. All information is for educational purposes. Explore responsibly and prioritize consent.
        </p>
      </footer>
    </div>
  );
}
