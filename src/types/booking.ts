export type Product = {
  id: string;
  name: string;
  icon: string;
  description: string;
  issues: string[];
};

export type Appointment = {
  date: string;
  time: string;
};

export type BookingState = {
  step: number;
  product?: Product;
  issueType?: string;
  notes?: string;
  appointment?: Appointment;
  contactName?: string;
  contactPhone?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'heating',
    name: 'Heating',
    icon: 'Radiator',
    description: 'Furnace, heating systems, and thermostats',
    issues: ['Furnace not working', 'No heat', 'Thermostat issue'],
  },
  {
    id: 'cooling',
    name: 'Cooling',
    icon: 'Fan',
    description: 'Air conditioning and cooling systems',
    issues: ['AC not cooling', 'Thermostat issue', 'Strange noise'],
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: 'Droplets',
    description: 'Pipes, drains, and water systems',
    issues: ['Leaking pipe', 'Clogged drain', 'Low water pressure'],
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: 'Zap',
    description: 'Electrical systems and lighting',
    issues: ['Power outage', 'Broken outlet', 'Lighting issue'],
  },
  {
    id: 'smart-home',
    name: 'Smart Home',
    icon: 'Home',
    description: 'Smart devices and home automation',
    issues: ['Device offline', 'Connectivity issue', 'Battery issue'],
  },
];