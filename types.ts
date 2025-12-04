export interface Investment {
  id: string;
  name: string;
  ticker: string;
  assetClass: 'Stock' | 'Bond' | 'Blended' | 'Short Term';
  balance: number;
  units: number;
  price: number;
  change: number; // Percentage change
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Contribution' | 'Gain/Loss' | 'Fee' | 'Transfer';
}

export interface PerformanceData {
  date: string;
  balance: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum TabView {
  SUMMARY = 'Summary',
  INVESTMENTS = 'Investments',
  ACTIVITY = 'Activity',
  ANALYSIS = 'Analysis'
}

export type Page = 'Accounts' | 'Planning' | 'News' | 'Profile';