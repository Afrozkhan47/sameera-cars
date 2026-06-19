import * as React from "react"
import Image from "next/image"
import { Calendar, Fuel, Gauge, ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Car } from "@/types"
import { formatPrice, formatMileage, getWhatsAppLink } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Standard Card Primitives
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card"
    className={cn(
      "bg-card text-card-foreground rounded-xl border border-border shadow-[0_2px_8px_rgba(0,0,0,0.015)] transition-smooth",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-header"
    className={cn("flex flex-col gap-1.5 p-5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-title"
    className={cn("font-bold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-description"
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-content"
    className={cn("p-5 pt-0", className)}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-footer"
    className={cn("flex items-center p-5 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Specialized Inventory Car Card Component
interface CarCardProps extends React.HTMLAttributes<HTMLDivElement> {
  car: Car;
}

function CarCard({ car, className, ...props }: CarCardProps) {
  const whatsappUrl = getWhatsAppLink(car);
  const mainImage = car.images[0] || "/images/car-placeholder.jpg"; // Handle missing images gracefully
  
  return (
    <Card 
      className={cn(
        "group overflow-hidden hover:shadow-[0_6px_20px_rgba(0,0,0,0.03)] hover:border-zinc-300/80", 
        className
      )} 
      {...props}
    >
      {/* Visual Header / Image Box */}
      <div className="relative aspect-card-image w-full overflow-hidden bg-zinc-50">
        <Image
          src={mainImage}
          alt={`${car.year} ${car.make} ${car.model}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-smooth group-hover:scale-[1.01]"
          priority={car.featured}
        />
        
        {/* Status Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {car.verified && (
            <Badge variant="success" className="gap-1 shadow-xs bg-emerald-50/95 text-emerald-800 border-emerald-200/40">
              <ShieldCheck className="size-3.5 shrink-0" />
              <span>Sameera Certified</span>
            </Badge>
          )}
          {car.featured && (
            <Badge variant="primary" className="shadow-xs">
              <span>Featured</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Car Summary Info */}
      <CardHeader className="p-5 pb-0">
        <div>
          <CardTitle className="text-base sm:text-lg font-bold text-foreground leading-tight tracking-tight line-clamp-1">
            {car.year} {car.make} {car.model}
          </CardTitle>
          {car.variant && (
            <span className="text-xs sm:text-sm text-muted-foreground font-medium mt-1 block line-clamp-1">
              {car.variant}
            </span>
          )}
        </div>
      </CardHeader>

      {/* Specifications Grid */}
      <CardContent className="p-5 pt-3 pb-0">
        <div className="grid grid-cols-3 gap-2 text-muted-foreground">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium min-w-0">
            <Gauge className="size-4 text-muted-foreground/80 shrink-0" />
            <span className="truncate">{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium min-w-0">
            <Fuel className="size-4 text-muted-foreground/80 shrink-0" />
            <span className="truncate">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium justify-end sm:justify-start min-w-0">
            <Calendar className="size-4 text-muted-foreground/80 shrink-0" />
            <span className="truncate">{car.transmission}</span>
          </div>
        </div>
      </CardContent>

      {/* Action Row: Price & Inquiry Button */}
      <CardFooter className="p-5 flex items-center justify-between gap-3 bg-zinc-50/30 dark:bg-zinc-800/10 border-t border-border/50 mt-4">
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs text-muted-foreground uppercase font-bold tracking-wider">
            Price
          </span>
          <span className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
            {formatPrice(car.price)}
          </span>
        </div>
        
        <Button
          asChild
          className="font-semibold tracking-tight shadow-xs cursor-pointer"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
            <span>WhatsApp Inquiry</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CarCard }
