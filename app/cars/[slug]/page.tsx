import { client } from "@/lib/sanity"
import { carBySlugQuery } from "@/lib/queries"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import CarDetail from "./car-detail"

export const revalidate = 60 // Revalidate every 60 seconds

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const car = await client.fetch(carBySlugQuery, { slug: resolvedParams.slug })
  
  if (!car) return { title: "Not Found" }

  const yearStr = car.year ? ` ${car.year}` : ""
  const fuelStr = car.fuelType ? ` ${car.fuelType}` : ""
  const title = `${car.title}${yearStr} | Sameera Cars Pune`
  const description = `Used ${car.title}${yearStr}${fuelStr} available at Sameera Cars Pune. View photos, specifications and enquire instantly via WhatsApp.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/cars/${resolvedParams.slug}`,
    },
  }
}

export default async function CarPage({ params }: { params: Promise<{ slug: string }> }) {
  // In Next.js 15+, params is a Promise that needs to be awaited
  const resolvedParams = await params
  
  const car = await client.fetch(carBySlugQuery, { slug: resolvedParams.slug })

  if (!car) {
    notFound()
  }

  return <CarDetail car={car} />
}
