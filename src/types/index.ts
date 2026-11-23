export type PositionCategory = 'Lying Down' | 'Sitting' | 'Standing' | 'Kneeling/Bending' | 'Advanced';
export type IntensityLevel = 'Low' | 'Medium' | 'High';
export type FlexibilityLevel = 'Low' | 'Medium' | 'High';
export type IntimacyLevel = 'Low' | 'Medium' | 'High';

export interface Position {
  id: string;
  name: string;
  description: string;
  category: PositionCategory;
  allowsAnal: boolean;
  imageUrl: string;
  dataAiHint: string;
  guide: string[];
  anatomicalInsights: string;
  intensity: IntensityLevel;
  flexibility: FlexibilityLevel;
  intimacy: IntimacyLevel;
}

export interface PositionFilters {
  searchTerm?: string;
  category?: PositionCategory | 'All';
  allowsAnal?: boolean | null; // null for "any"
  intensity?: IntensityLevel | 'All';
  flexibility?: FlexibilityLevel | 'All';
  intimacy?: IntimacyLevel | 'All';
}

export const intensityLevels: IntensityLevel[] = ['Low', 'Medium', 'High'];
export const flexibilityLevels: FlexibilityLevel[] = ['Low', 'Medium', 'High'];
export const intimacyLevels: IntimacyLevel[] = ['Low', 'Medium', 'High'];
export const positionCategories: PositionCategory[] = ['Lying Down', 'Sitting', 'Standing', 'Kneeling/Bending', 'Advanced'];
