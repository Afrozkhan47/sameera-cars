import { client } from "@/lib/sanity"
import { carsQuery } from "@/lib/queries"
import CarsClient from "./cars-client"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function CarsPage() {
  const cars = await client.fetch(carsQuery)

  return <CarsClient initialCars={cars} />
}
