import ProductsPageClient from "./products-page-client"

export const dynamic = "force-static"
export const revalidate = 600

interface StrapiImage {
  url: string
  formats?: {
    large?: { url: string }
    medium?: { url: string }
    small?: { url: string }
  }
}

interface StrapiProduct {
  id: number
    productName: string
    slug: string
    price: number
    category: string
    createdAt: string
    Images?:StrapiImage[]
}

interface TransformedProduct {
  id: number
  productName: string
  slug: string
  price: number
  category: string
  createdAt: string
  Images?: {
    url: string
    formats?: StrapiImage['formats']
  }[]
}

export default async function ProductsPage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=Images`,
      {
        cache: "force-cache",
        next: { revalidate: 600 },
      }
    )

    if (!res.ok) throw new Error("Failed to fetch products")

    const data = await res.json()

    const products: TransformedProduct[] = data.data.map((p: StrapiProduct) => ({
      id: p.id,
      productName: p.productName,
      slug: p.slug,
      price: p.price,
      category: p.category,
      createdAt: p.createdAt,
      Images: p.Images?.map((img: StrapiImage) => ({
        url: img.url,
        formats: img.formats,
      })),
    }))

    return <ProductsPageClient products={products} />
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred"

    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-600">Error loading products: {errorMessage}</p>
        </div>
      </div>
    )
  }
}
