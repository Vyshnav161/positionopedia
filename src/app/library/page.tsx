
"use client";

import { useState, useMemo, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import PositionCard from '@/components/PositionCard';
import { positionsData } from '@/data/positions';
import type { Position, PositionFilters, PositionCategory, IntensityLevel, FlexibilityLevel, IntimacyLevel } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ListFilter, XCircle, Search, Filter } from 'lucide-react'; 
import { positionCategories, intensityLevels, flexibilityLevels, intimacyLevels } from '@/types';
import { Separator } from '@/components/ui/separator';

const initialFilters: PositionFilters = {
  searchTerm: '',
  category: 'All',
  allowsAnal: null,
  intensity: 'All',
  flexibility: 'All',
  intimacy: 'All',
};

const intimacySortOrder: Record<IntimacyLevel, number> = {
  'Low': 1,
  'Medium': 2,
  'High': 3,
};

export default function LibraryPage() {
  const [filters, setFilters] = useState<PositionFilters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<PositionFilters>(initialFilters);
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

  const applyFiltersHandler = () => {
    setAppliedFilters(filters);
  };

  const filteredPositions = useMemo(() => {
    const positions = positionsData.filter(position => {
      const searchTermMatch = position.name.toLowerCase().includes(appliedFilters.searchTerm?.toLowerCase() || '') ||
                              position.description.toLowerCase().includes(appliedFilters.searchTerm?.toLowerCase() || '');
      const categoryMatch = appliedFilters.category === 'All' || position.category === appliedFilters.category;
      const analMatch = appliedFilters.allowsAnal === null || position.allowsAnal === appliedFilters.allowsAnal;
      const intensityMatch = appliedFilters.intensity === 'All' || position.intensity === appliedFilters.intensity;
      const flexibilityMatch = appliedFilters.flexibility === 'All' || position.flexibility === appliedFilters.flexibility;
      const intimacyMatch = appliedFilters.intimacy === 'All' || position.intimacy === appliedFilters.intimacy;

      return searchTermMatch && categoryMatch && analMatch && intensityMatch && flexibilityMatch && intimacyMatch;
    });

    // Sort by new featured position, "The Melt" first, then "The Grind", then intimacy: High > Medium > Low
    return positions.sort((a, b) => {
      if (a.id === 'new-featured-position') return -1;
      if (b.id === 'new-featured-position') return 1;
      if (a.id === 'the-melt') return -1;
      if (b.id === 'the-melt') return 1;
      if (a.id === 'the-grind') return -1;
      if (b.id === 'the-grind') return 1;
      return intimacySortOrder[b.intimacy] - intimacySortOrder[a.intimacy];
    });
  }, [appliedFilters]);

  const resetFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters); 
  };

  if (!isClient) {
    return (
      <AppShell>
        <div className="flex justify-center items-center h-64">
          <ListFilter className="h-12 w-12 animate-pulse text-primary" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-headline text-primary tracking-tight">Position Library</h1>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            Discover a diverse collection of positions. Filter by your preferences to find what suits you best.
          </p>
        </header>

        <div className="bg-card p-4 sm:p-6 rounded-lg shadow border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="searchTerm" className="font-body text-sm font-medium">Search by Name/Keyword</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="searchTerm"
                  type="text"
                  placeholder="E.g., Missionary, Spooning..."
                  value={filters.searchTerm} 
                  onChange={e => handleFilterChange('searchTerm', e.target.value)}
                  className="pl-9 font-body"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category" className="font-body text-sm font-medium">Category</Label>
              <Select value={filters.category} onValueChange={value => handleFilterChange('category', value as PositionCategory | 'All')}>
                <SelectTrigger id="category" className="font-body"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {positionCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="intensity" className="font-body text-sm font-medium">Intensity</Label>
              <Select value={filters.intensity} onValueChange={value => handleFilterChange('intensity', value as IntensityLevel | 'All')}>
                <SelectTrigger id="intensity" className="font-body"><SelectValue placeholder="Select intensity" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Intensities</SelectItem>
                  {intensityLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="flexibility" className="font-body text-sm font-medium">Flexibility</Label>
              <Select value={filters.flexibility} onValueChange={value => handleFilterChange('flexibility', value as FlexibilityLevel | 'All')}>
                <SelectTrigger id="flexibility" className="font-body"><SelectValue placeholder="Select flexibility" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Flexibility Levels</SelectItem>
                  {flexibilityLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="intimacy" className="font-body text-sm font-medium">Intimacy</Label>
              <Select value={filters.intimacy} onValueChange={value => handleFilterChange('intimacy', value as IntimacyLevel | 'All')}>
                <SelectTrigger id="intimacy" className="font-body"><SelectValue placeholder="Select intimacy" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Intimacy Levels</SelectItem>
                  {intimacyLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-5 sm:pt-7">
              <Checkbox
                id="allowsAnal"
                checked={filters.allowsAnal === true}
                onCheckedChange={handleAnalCheckboxChange}
              />
              <Label htmlFor="allowsAnal" className="font-body text-sm font-medium cursor-pointer">
                If you want anal only
              </Label>
            </div>
            
            <div className="col-span-full flex flex-col sm:flex-row gap-3 pt-4 mt-2">
              <Button onClick={applyFiltersHandler} className="w-full sm:w-auto font-body bg-primary hover:bg-primary/90 text-primary-foreground">
                <Filter className="mr-2 h-4 w-4" /> Apply Filters
              </Button>
              <Button onClick={resetFilters} variant="outline" className="w-full sm:w-auto font-body">
                <XCircle className="mr-2 h-4 w-4" /> Reset Filters
              </Button>
            </div>
          </div>
        </div>
        
        <Separator />

        {filteredPositions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPositions.map(position => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ListFilter className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-headline text-muted-foreground">No positions match your current filters.</p>
            <p className="font-body text-muted-foreground mt-1">Try adjusting your search or resetting the filters.</p>
            <Button onClick={resetFilters} variant="link" className="mt-4 text-primary font-body">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}


    