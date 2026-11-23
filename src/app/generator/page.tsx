"use client";

import { useState, useMemo, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import PositionCard from '@/components/PositionCard';
import { positionsData } from '@/data/positions';
import type { Position, PositionFilters, PositionCategory, IntensityLevel, FlexibilityLevel, IntimacyLevel } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, XCircle, Lightbulb } from 'lucide-react';
import { positionCategories, intensityLevels, flexibilityLevels, intimacyLevels } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const initialFilters: PositionFilters = {
  category: 'All',
  allowsAnal: null,
  intensity: 'All',
  flexibility: 'All',
  intimacy: 'All',
};

export default function GeneratorPage() {
  const [filters, setFilters] = useState<PositionFilters>(initialFilters);
  const [generatedPositions, setGeneratedPositions] = useState<Position[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFilterChange = (filterName: keyof PositionFilters, value: any) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleAnalCheckboxChange = (checked: boolean | 'indeterminate') => {
    if (checked === 'indeterminate') return;
    handleFilterChange('allowsAnal', checked ? true : null);
  };

  const generatePositions = () => {
    const results = positionsData.filter(position => {
      const categoryMatch = filters.category === 'All' || position.category === filters.category;
      const analMatch = filters.allowsAnal === null || position.allowsAnal === filters.allowsAnal;
      const intensityMatch = filters.intensity === 'All' || position.intensity === filters.intensity;
      const flexibilityMatch = filters.flexibility === 'All' || position.flexibility === filters.flexibility;
      const intimacyMatch = filters.intimacy === 'All' || position.intimacy === filters.intimacy;
      return categoryMatch && analMatch && intensityMatch && flexibilityMatch && intimacyMatch;
    });
    // Shuffle results for a "generated" feel
    setGeneratedPositions(results.sort(() => 0.5 - Math.random()));
    setShowResults(true);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setGeneratedPositions([]);
    setShowResults(false);
  };
  
  if (!isClient) {
    return (
      <AppShell>
        <div className="flex justify-center items-center h-64">
          <Lightbulb className="h-12 w-12 animate-pulse text-primary" />
        </div>
      </AppShell>
    );
  }


  return (
    <AppShell>
      <div className="space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-headline text-primary tracking-tight">Position Generator</h1>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            Tell us your preferences, and we'll suggest some positions for you to explore. It's all about finding what works for you and your partner(s)!
          </p>
        </header>

        <Card className="shadow-lg border-border bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
              <SlidersHorizontal className="mr-3 h-6 w-6" /> Your Preferences
            </CardTitle>
            <CardDescription className="font-body text-muted-foreground">
              Select your desired characteristics for a position.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="genCategory" className="font-body text-sm font-medium">Category</Label>
                <Select value={filters.category} onValueChange={value => handleFilterChange('category', value as PositionCategory | 'All')}>
                  <SelectTrigger id="genCategory" className="font-body"><SelectValue placeholder="Any Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Any Category</SelectItem>
                    {positionCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="genIntensity" className="font-body text-sm font-medium">Intensity Level</Label>
                <Select value={filters.intensity} onValueChange={value => handleFilterChange('intensity', value as IntensityLevel | 'All')}>
                  <SelectTrigger id="genIntensity" className="font-body"><SelectValue placeholder="Any Intensity" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Any Intensity</SelectItem>
                    {intensityLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="genFlexibility" className="font-body text-sm font-medium">Flexibility Required</Label>
                <Select value={filters.flexibility} onValueChange={value => handleFilterChange('flexibility', value as FlexibilityLevel | 'All')}>
                  <SelectTrigger id="genFlexibility" className="font-body"><SelectValue placeholder="Any Flexibility" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Any Flexibility</SelectItem>
                    {flexibilityLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="genIntimacy" className="font-body text-sm font-medium">Intimacy Level</Label>
                <Select value={filters.intimacy} onValueChange={value => handleFilterChange('intimacy', value as IntimacyLevel | 'All')}>
                  <SelectTrigger id="genIntimacy" className="font-body"><SelectValue placeholder="Any Intimacy" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Any Intimacy</SelectItem>
                    {intimacyLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 pt-5 md:col-span-2 lg:col-span-1">
                <Checkbox
                  id="genAllowsAnal"
                  checked={filters.allowsAnal === true}
                  onCheckedChange={handleAnalCheckboxChange}
                />
                <Label htmlFor="genAllowsAnal" className="font-body text-sm font-medium cursor-pointer">
                  If you want anal only
                </Label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={generatePositions} className="w-full sm:w-auto font-body bg-primary hover:bg-primary/90 text-primary-foreground">
                <Lightbulb className="mr-2 h-5 w-5" /> Generate Suggestions
              </Button>
              <Button onClick={resetFilters} variant="outline" className="w-full sm:w-auto font-body">
                <XCircle className="mr-2 h-5 w-5" /> Reset Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {showResults && (
          <>
            <Separator className="my-8" />
            <div className="space-y-4">
              <h2 className="text-3xl font-headline text-primary text-center">Generated Positions ({generatedPositions.length})</h2>
              {generatedPositions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedPositions.map(position => (
                    <PositionCard key={position.id} position={position} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lightbulb className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-xl font-headline text-muted-foreground">No positions match your current preferences.</p>
                  <p className="font-body text-muted-foreground mt-1">Try adjusting your preferences or explore the full library.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
