import { groq } from "next-sanity"

export const carsQuery = groq`
*[_type == "car"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  price,
  year,
  fuelType,
  transmission,
  kilometersDriven,
  ownership,
  description,
  featured,
  availability,
  brand,
  gallery
}
`

export const carBySlugQuery = groq`
*[_type == "car" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  price,
  year,
  fuelType,
  transmission,
  kilometersDriven,
  ownership,
  description,
  featured,
  availability,
  brand,
  gallery
}
`