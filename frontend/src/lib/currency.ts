import { BuildingType, ServicePackage } from '@/types';

/**
 * Formats a number to Indian Rupee (INR) currency representation.
 * Supports compact format (e.g., ₹24.5 L, ₹1.8 Cr) or full comma-separated format.
 */
export function formatINR(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }

  if (compact) {
    if (amount >= 10000000) {
      const cr = amount / 10000000;
      return `₹${cr.toFixed(cr >= 10 ? 1 : 2)} Cr`;
    }
    if (amount >= 100000) {
      const lakh = amount / 100000;
      return `₹${lakh.toFixed(lakh >= 10 ? 1 : 2)} Lakh`;
    }
  }

  // Standard Indian comma format (en-IN)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats rate per square foot (e.g., ₹1,850 / sq.ft)
 */
export function formatRatePerSqft(rate: number): string {
  return `₹${new Intl.NumberFormat('en-IN').format(rate)}/sq.ft`;
}

/**
 * Human-readable package names
 */
export const PACKAGE_LABELS: Record<ServicePackage, string> = {
  LABOUR_ONLY: 'Labour Only',
  LABOUR_PLUS_MATERIAL: 'Labour + Material',
  STRUCTURE_ONLY: 'Grey Structure Only',
  TURNKEY: 'Complete Turnkey',
  RENOVATION: 'Renovation & Repair',
};

/**
 * Human-readable building types
 */
export const BUILDING_TYPE_LABELS: Record<BuildingType, string> = {
  INDEPENDENT_HOUSE: 'Independent House',
  VILLA: 'Villa / Duplex',
  APARTMENT: 'Apartment Building',
  COMMERCIAL: 'Commercial Building',
  OFFICE: 'Office Space',
  RENOVATION: 'Home Renovation',
  OTHER: 'Other Construction',
};

/**
 * Popular Indian cities where NirmanSetu operates
 */
export const POPULAR_CITIES = [
  'Delhi NCR (Noida, Gurugram, Delhi)',
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Mumbai & Thane',
  'Jaipur',
  'Ahmedabad',
  'Lucknow',
];
