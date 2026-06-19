import { Car, ContactInfo } from "@/types";

// Dealership primary contact details
export const CONTACT_INFO: ContactInfo = {
  phone: "+91 98220 12345", // Custom Pune representation
  whatsapp: "+919822012345", // WhatsApp API format (no spaces, dashes, or + symbols)
  email: "contact@sameeracars.in",
  address: "Survey No. 45, Baner Road, Near Baner Phata, Baner, Pune, Maharashtra 411045",
  mapUrl: "https://maps.google.com/?q=Baner+Road+Pune",
  hours: "Mon - Sun: 10:00 AM - 8:00 PM"
};

// Filter dropdown values
export const POPULAR_MAKES = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Mahindra",
  "Honda",
  "Toyota",
  "Kia",
  "Volkswagen",
  "Skoda"
];

export const BODY_TYPES = ["SUV", "Sedan", "Hatchback", "MPV", "Coupe"] as const;
export const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"] as const;
export const TRANSMISSIONS = ["Manual", "Automatic"] as const;

// Price formatter (INR Local format)
export function formatPrice(price: number): string {
  // Format to standard Indian numbering system, e.g. 12,45,000
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
  
  return formattedPrice;
}

// Convert price to compact Lakh notation, e.g. 1245000 -> 12.45 Lakh
export function formatPriceCompact(price: number): string {
  if (price >= 100000) {
    const lakhs = price / 100000;
    return `₹${lakhs.toFixed(2)} Lakh`;
  }
  return formatPrice(price);
}

// Mileage formatter
export function formatMileage(km: number): string {
  return `${new Intl.NumberFormat("en-IN").format(km)} km`;
}

// Year formatting utility (e.g. 2021)
export function formatYear(year: number): string {
  return `${year}`;
}

// WhatsApp link generator for lead tracking
export function getWhatsAppLink(car: Car): string {
  const brandModel = `${car.year} ${car.make} ${car.model}`;
  const priceStr = formatPriceCompact(car.price);
  const message = `Hi Sameera Cars, I am interested in the pre-owned *${brandModel}* (${car.color}, ${formatMileage(car.mileage)}, listed for *${priceStr}*). Is it still available?`;
  
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Phone call link generator
export function getPhoneLink(): string {
  return `tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`;
}
