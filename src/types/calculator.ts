export type CalculatorCategory = 'gpa' | 'marks' | 'utility';

export type SPPUPattern = '2019' | '2024' | '2015' | 'general';

export interface CalculatorMeta {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: CalculatorCategory;
  badge?: string;
  iconName: string;
  keywords: string[];
  popular?: boolean;
  formulaSummary: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculationResult {
  primaryValue: string | number;
  primaryLabel: string;
  primaryUnit?: string;
  secondaryValues?: {
    label: string;
    value: string | number;
    badgeColor?: 'blue' | 'green' | 'amber' | 'purple' | 'rose' | 'slate';
  }[];
  grade?: string;
  divisionClass?: string;
  status?: 'Pass' | 'Fail' | 'Distinction' | 'Warning' | 'Safe' | 'Good';
  formulaUsed: string;
  steps?: string[];
  notes?: string;
  remarks?: string;
}

export type IllustrationState = 'idle' | 'typing' | 'calculating' | 'success';
