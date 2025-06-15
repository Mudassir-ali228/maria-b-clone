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
      large?: { url: string }
      medium?: { url: string }
      small?: { url: string }
    }
  }>
}

const categories = [
  { id: "fx", name: "formals", label: "Formals" },
  { id: "sg", name: "signature", label: "Signature" },
]

export default function ProductsPageClient({ products }: { products: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

  useEffect(() => {
    let filtered = [...products]

    // Filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory.toLowerCase(),
      )
    }

    // Sort
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
  }, [products, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-white">
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  )
}
