"use client"

import ProductGrid from "@/components/ui/product"

interface Product {
  id: number
  productName: string
  slug: string
  price: number
  createdAt: string
  Images?: Array<{
    url: string
    formats?: {
      large?: { url: string }
      medium?: { url: string }
      small?: { url: string }
    }
  }>
}

export default function ProductsPageClient({ products }: { products: Product[] }) {
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
    <div className="min-h-screen bg-white">
      <ProductGrid products={products} />
    </div>
  )
}
