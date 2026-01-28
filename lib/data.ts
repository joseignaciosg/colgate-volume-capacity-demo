export interface Site {
  id: string;
  name: string;
  location: string;
  region: 'LATAM' | 'NA' | 'EMEA' | 'APAC';
  products: string;
  status: 'Submitted' | 'Pending' | 'Needs Review';
  waterRisk: 1 | 2 | 3 | 4 | 5;
}

export interface VolumeData {
  siteId: string;
  product: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  capacityUtilization: number;
  notes: string;
}

export interface PutsTakes {
  id: string;
  siteId: string;
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

export const products = [
  'Colgate Total',
  'Max Fresh',
  'Sensitive',
  'elmex',
  'meridol',
];

export const mockVolumeData: VolumeData[] = [
  {
    siteId: 'cali',
    product: 'Colgate Total',
    q1: 125000,
    q2: 130000,
    q3: 135000,
    q4: 140000,
    capacityUtilization: 78,
    notes: 'Increased demand expected in Q4',
  },
  {
    siteId: 'sao-bernardo',
    product: 'Max Fresh',
    q1: 95000,
    q2: 98000,
    q3: 100000,
    q4: 105000,
    capacityUtilization: 82,
    notes: '',
  },
  // Add more as needed
];

export const mockPutsTakes: PutsTakes[] = [
  {
    id: '1',
    siteId: 'cali',
    date: '2024-01-15',
    reason: 'Product transfer',
    oldValue: 120000,
    newValue: 125000,
    requestedBy: 'Maria Santos',
  },
  {
    id: '2',
    siteId: 'guangzhou',
    date: '2024-01-20',
    reason: 'Capacity expansion',
    oldValue: 80000,
    newValue: 95000,
    requestedBy: 'Wei Chen',
  },
  {
    id: '3',
    siteId: 'morristown',
    date: '2024-02-01',
    reason: 'Demand change',
    oldValue: 110000,
    newValue: 105000,
    requestedBy: 'John Smith',
  },
  {
    id: '4',
    siteId: 'mumbai',
    date: '2024-02-10',
    reason: 'Supply issue',
    oldValue: 150000,
    newValue: 140000,
    requestedBy: 'Priya Patel',
  },
];
