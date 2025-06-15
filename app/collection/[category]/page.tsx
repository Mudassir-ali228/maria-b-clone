import ProductsPageClient from "./products-page-client"

export const dynamic = "force-dynamic"
export const revalidate = 600

interface StrapiProduct {
  id: number
    productName: string
    slug: string
    price: number
    createdAt: string
    Images?: {
          url: string
          formats?: {
            large?: { url: string }
            medium?: { url: string }
            small?: { url: string }
          }
      }[]
  }

export default async function ProductsPage({ params }: { params: { category: string } }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?filters[prod_id][$contains]=${params.category}&populate=Images`,
      {
        next: { revalidate: 600 },
      }
    )

    if (!res.ok) throw new Error("Failed to fetch products")

    const data = await res.json()

    const products = (data?.data as StrapiProduct[]).map((p) => ({
      id: p.id,
      productName: p.productName,
      slug: p.slug,
      price: p.price,
      createdAt: p.createdAt,
      Images: p.Images?.map((img) => ({
        url: img.url,
        formats: img.formats,
      })),
    }))

    return <ProductsPageClient products={products} />
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred"
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-600">Error loading products: {message}</p>
      </div>
    )
  }
}
