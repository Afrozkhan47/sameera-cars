export type TransmissionType = "Manual" | "Automatic";

export type FuelType = "Petrol" | "Diesel" | "CNG" | "Electric" | "Hybrid";

export type BodyType = "SUV" | "Sedan" | "Hatchback" | "MPV" | "Coupe";

export interface Car {
  id: string;
  make: string;         // e.g., "Hyundai"
  model: string;        // e.g., "Creta"
  variant?: string;     // e.g., "1.6 SX"
  year: number;         // e.g., 2021
  price: number;        // e.g., 1245000 (represented in INR)
  mileage: number;      // e.g., 45000 (represented in km)
  transmission: TransmissionType;
  fuelType: FuelType;
  bodyType: BodyType;
  color: string;        // e.g., "Polar White"
  ownerCount: number;   // e.g., 1 (for 1st Owner)
  images: string[];     // Array of image paths/URLs
  verified: boolean;    // "Sameera Certified" stamp of trust
  featured: boolean;    // Featured placement flag
  features: string[];   // List of key equipment (e.g., ["Reverse Camera", "Sunroof"])
  engineCc?: number;    // e.g., 1597
  registrationState?: string; // e.g., "MH-12" (Pune registered)
  description?: string; // Short details overview
  createdAt: string;    // Date timestamp string
}

export interface FilterOptions {
  make?: string;
  bodyType?: BodyType;
  transmission?: TransmissionType;
  fuelType?: FuelType;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapUrl: string;
  hours: string;
}
