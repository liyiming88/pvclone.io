import { Investment, Transaction, PerformanceData } from './types';

export const USER_NAME = "Alexander J. Investor";
export const PLAN_NAME = "ACME CORP 401(K) SAVINGS PLAN";
export const PLAN_ID = "84291-01";

export const MOCK_HOLDINGS: Investment[] = [
  {
    id: '1',
    name: 'FID 500 INDEX',
    ticker: 'FXAIX',
    assetClass: 'Stock',
    balance: 145230.50,
    units: 842.12,
    price: 172.46,
    change: 1.2
  },
  {
    id: '2',
    name: 'VANGUARD TOT INTL',
    ticker: 'VXUS',
    assetClass: 'Stock',
    balance: 42100.25,
    units: 750.45,
    price: 56.10,
    change: -0.4
  },
  {
    id: '3',
    name: 'FID US BOND IDX',
    ticker: 'FXNAX',
    assetClass: 'Bond',
    balance: 25000.00,
    units: 2314.81,
    price: 10.80,
    change: 0.1
  },
  {
    id: '4',
    name: 'TRP RETIRE 2050',
    ticker: 'TRRMX',
    assetClass: 'Blended',
    balance: 85600.75,
    units: 3200.15,
    price: 26.75,
    change: 0.8
  },
  {
    id: '5',
    name: 'GOVT CASH RSRVS',
    ticker: 'FDRXX',
    assetClass: 'Short Term',
    balance: 5000.00,
    units: 5000.00,
    price: 1.00,
    change: 0.0
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2023-10-27', description: 'EMPLOYEE DEFERRAL', amount: 850.00, type: 'Contribution' },
  { id: 't2', date: '2023-10-27', description: 'EMPLOYER MATCH', amount: 425.00, type: 'Contribution' },
  { id: 't3', date: '2023-10-13', description: 'EMPLOYEE DEFERRAL', amount: 850.00, type: 'Contribution' },
  { id: 't4', date: '2023-10-13', description: 'EMPLOYER MATCH', amount: 425.00, type: 'Contribution' },
  { id: 't5', date: '2023-09-30', description: 'DIVIDEND REINVESTMENT', amount: 1240.50, type: 'Gain/Loss' },
  { id: 't6', date: '2023-09-15', description: 'RECORDKEEPING FEE', amount: -12.50, type: 'Fee' },
];

export const MOCK_PERFORMANCE: PerformanceData[] = [
  { date: 'Jan', balance: 245000 },
  { date: 'Feb', balance: 248000 },
  { date: 'Mar', balance: 246500 },
  { date: 'Apr', balance: 252000 },
  { date: 'May', balance: 258000 },
  { date: 'Jun', balance: 265000 },
  { date: 'Jul', balance: 270000 },
  { date: 'Aug', balance: 268000 },
  { date: 'Sep', balance: 262000 },
  { date: 'Oct', balance: 275000 },
  { date: 'Nov', balance: 289000 },
  { date: 'Dec', balance: 302931 },
];