export interface Site {
  id: string;
  name: string;
  location: string;
  region: 'LATAM' | 'NA' | 'EMEA' | 'APAC';
  products: string;
  status: 'Submitted' | 'Pending' | 'Needs Review';
  waterRisk: 1 | 2 | 3 | 4 | 5;
}

export interface MonthlyVolumeData {
  siteId: string;
  sku: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  unit: 'tons'; // Always tons per month
  notes: string;
}

export interface PutsTakes {
  id: string;
  siteId: string;
  sku: string;
  date: string;
  reason: 'Product transfer' | 'Capacity expansion' | 'Demand change' | 'Supply issue';
  oldValue: number;
  newValue: number;
  requestedBy: string;
}

export const sites: Site[] = [
  {
    id: 'cali',
    name: 'Cali Plant',
    location: 'Colombia',
    region: 'LATAM',
    products: 'Toothpaste, Mouthwash',
    status: 'Submitted',
    waterRisk: 3,
  },
  {
    id: 'sao-bernardo',
    name: 'São Bernardo',
    location: 'Brazil',
    region: 'LATAM',
    products: 'Toothpaste, Toothbrush',
    status: 'Pending',
    waterRisk: 4,
  },
  {
    id: 'morristown',
    name: 'Morristown',
    location: 'USA',
    region: 'NA',
    products: 'Premium Oral Care',
    status: 'Submitted',
    waterRisk: 2,
  },
  {
    id: 'anzio',
    name: 'Anzio',
    location: 'Italy',
    region: 'EMEA',
    products: 'Toothpaste EU',
    status: 'Needs Review',
    waterRisk: 2,
  },
  {
    id: 'guangzhou',
    name: 'Guangzhou',
    location: 'China',
    region: 'APAC',
    products: 'Toothpaste APAC',
    status: 'Pending',
    waterRisk: 5,
  },
  {
    id: 'mexico-city',
    name: 'Mexico City',
    location: 'Mexico',
    region: 'LATAM',
    products: 'Toothpaste LATAM',
    status: 'Submitted',
    waterRisk: 4,
  },
  {
    id: 'gebze',
    name: 'Gebze',
    location: 'Turkey',
    region: 'EMEA',
    products: 'Toothpaste EMEA',
    status: 'Pending',
    waterRisk: 3,
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    location: 'India',
    region: 'APAC',
    products: 'Toothpaste, Mouthwash',
    status: 'Submitted',
    waterRisk: 5,
  },
  {
    id: 'warsaw',
    name: 'Warsaw',
    location: 'Poland',
    region: 'EMEA',
    products: 'Toothpaste EU',
    status: 'Pending',
    waterRisk: 2,
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    location: 'Thailand',
    region: 'APAC',
    products: 'Oral Care APAC',
    status: 'Needs Review',
    waterRisk: 3,
  },
];

export const skus = [
  'Colgate Total',
  'Max Fresh',
  'Sensitive',
  'elmex',
  'meridol',
  'Optic White',
  'Kids',
  'Natural Extracts',
  'Triple Action',
  'Total Advanced',
];

export const mockMonthlyData: MonthlyVolumeData[] = [
  {
    siteId: 'cali',
    sku: 'Colgate Total',
    jan: 42, feb: 43, mar: 44, apr: 45, may: 46, jun: 47,
    jul: 48, aug: 49, sep: 50, oct: 51, nov: 52, dec: 53,
    unit: 'tons',
    notes: '',
  },
  {
    siteId: 'cali',
    sku: 'Max Fresh',
    jan: 32, feb: 33, mar: 34, apr: 35, may: 36, jun: 37,
    jul: 38, aug: 39, sep: 40, oct: 41, nov: 42, dec: 43,
    unit: 'tons',
    notes: '',
  },
];

export const mockPutsTakes: PutsTakes[] = [
  {
    id: '1',
    siteId: 'cali',
    sku: 'Colgate Total',
    date: '2024-01-15',
    reason: 'Product transfer',
    oldValue: 42,
    newValue: 45,
    requestedBy: 'Maria Santos',
  },
  {
    id: '2',
    siteId: 'guangzhou',
    sku: 'Max Fresh',
    date: '2024-01-20',
    reason: 'Capacity expansion',
    oldValue: 30,
    newValue: 35,
    requestedBy: 'Wei Chen',
  },
];
