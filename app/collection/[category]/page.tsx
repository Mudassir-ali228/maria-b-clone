"use client"

import ProductGrid from "@/components/ui/product"
import { useEffect, useState } from "react"
import { use } from "react"

interface Product {
  id: number
  productName: string
  slug: string
  price: number
  Images?: Array<{
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
  }>
}

export default function ProductsPage({ params }: { params: Promise<{ category: string }> }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Unwrap the params Promise using React.use()
  const { category } = use(params)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?filters[prod_id][$contains]=${category}&populate=Images`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      fetchProducts()
    }
  }, [category])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-2">No products found</p>
            <p className="text-gray-500">Try browsing other categories</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <ProductGrid products={products} />
    </div>
  )
}
