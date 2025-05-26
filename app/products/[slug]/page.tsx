import ProductDetail from "@/components/ui/product-detail"
import Link from "next/link"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

interface ProductImage {
  url: string
  formats?: {
    large?: {
      url: string
    }
    medium?: {
      url: string
    }
    small?: {
      url: string
    }
  }
}

interface Product {
  id: number
  productName: string
  price: number
  slug: string
  description?: string
  category?: string
  Images?: ProductImage[]
  createdAt: string
  updatedAt: string
}

interface StrapiResponse {
  data: Product[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  try {
    const res = await fetch(
      `https://graceful-surprise-a16adfb07c.strapiapp.com/api/products?filters[slug][$eq]=${slug}&populate=Images`,
      {
        next: { revalidate: 10 },
      },
    )

    if (!res.ok) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white pt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error loading product</h1>
            <p className="text-gray-600 mb-6">There was an error loading the product. Please try again later.</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      )
    }

    const data: StrapiResponse = await res.json()
    const product = data.data[0]

    if (!product) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white pt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
            <p className="text-gray-600 mb-6">The product you`re looking for doesn`t exist or has been removed.</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      )
    }

    return <ProductDetail product={product} />
  } catch (error) {
    console.error("Error fetching product:", error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error loading product</h1>
          <p className="text-gray-600 mb-6">There was an error loading the product. Please try again later.</p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse All Products
          </Link>
          <br />
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params

  try {
    const res = await fetch(
      `https://graceful-surprise-a16adfb07c.strapiapp.com/api/products?filters[slug][$eq]=${slug}&populate=*`,
      {
        next: { revalidate: 10 },
      },
    )

    if (!res.ok) {
      return {
        title: "Product Not Found - Maria.B",
        description: "The requested product could not be found.",
      }
    }

    const data: StrapiResponse = await res.json()
    const product = data.data[0]

    if (!product) {
      return {
        title: "Product Not Found - Maria.B",
        description: "The requested product could not be found.",
      }
    }

    return {
      title: `${product.productName} - Maria.B`,
      description: product.description || `${product.productName} - Premium fashion collection by Maria.B`,
      openGraph: {
        title: product.productName,
        description: product.description || `${product.productName} - Premium fashion collection by Maria.B`,
        images: product.Images?.[0]?.url
          ? [
              {
                url: product.Images[0].url.startsWith("http")
                  ? product.Images[0].url
                  : `https://graceful-surprise-a16adfb07c.strapiapp.com${product.Images[0].url}`,
                width: 800,
                height: 600,
                alt: product.productName,
              },
            ]
          : [],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Product - Maria.B",
      description: "Premium fashion collection by Maria.B",
    }
  }
}
