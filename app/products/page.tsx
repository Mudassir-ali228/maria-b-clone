"use client"

import { useEffect, useState } from "react"
import ProductGrid from "@/components/ui/product"
import ProductFilter from "@/components/ui/product-filter"

interface Product {
  id: number
  productName: string
  slug: string
  price: number
  category: string
  createdAt: string
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

const categories = [
  { id: "fx", name: "formals", label: "Formals" },
  { id: "sg", name: "signature", label: "Signature" },
]

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=Images`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setAllProducts(data.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setAllProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...allProducts]

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category?.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name-asc":
          return a.productName.localeCompare(b.productName)
        case "name-desc":
          return b.productName.localeCompare(a.productName)
        case "date-asc":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "date-desc":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    setFilteredProducts(filtered)
  }, [allProducts, selectedCategory, sortBy])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
  }

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

  return (
    <div className="min-h-screen bg-white">
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  )
}
