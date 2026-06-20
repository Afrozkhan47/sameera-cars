import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const cars = await client.fetch(`
    *[_type == "car"]{
      slug,
      _updatedAt
    }
  `);

    const carPages = cars.map(
        (car: { slug: { current: string }; _updatedAt: string }) => ({
            url: `https://sameeracars.vercel.app/cars/${car.slug.current}`,
            lastModified: new Date(car._updatedAt),
            changeFrequency: "daily" as const,
            priority: 0.8,
        })
    );

    return [
        {
            url: "https://sameeracars.vercel.app",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://sameeracars.vercel.app/cars",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        ...carPages,
    ];
}
