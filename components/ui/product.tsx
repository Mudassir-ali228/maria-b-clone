"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const strapiUrl = "https://graceful-surprise-a16adfb07c.strapiapp.com"

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
  slug: string
  price: number
  Images?: ProductImage[]
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center bg-white min-h-screen pt-20 py-6 lg:py-10">
        <div className="max-w-[1400px] w-full px-4 lg:px-6">
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No products to display</p>
          </div>
        </div>
      </div>
    )
  }

  const createMobileRows = (products: Product[]) => {
    const rows: Product[][] = []
    for (let i = 0; i < products.length; i += 2) {
      rows.push(products.slice(i, i + 2))
    }
    return rows
  }

  const createDesktopRows = (products: Product[]) => {
    if (!products || products.length === 0) return []

    const rows: Product[][] = []
    let currentIndex = 0

    while (currentIndex < products.length) {
      const rowNumber = rows.length + 1
      const isOddRow = rowNumber % 2 === 1

      // Desktop: 3-2-3-2 pattern
      const itemsInRow = isOddRow ? 3 : 2

      const rowItems = products.slice(currentIndex, currentIndex + itemsInRow)
      rows.push(rowItems)
      currentIndex += itemsInRow
    }

    return rows
  }

  const getImageUrl = (product: Product, isHover = false) => {
    if (!product?.Images || product.Images.length === 0) return null

    // For hover effect, use the second image if available, otherwise use the first
    const imageIndex = isHover && product.Images.length > 1 ? 1 : 0
    const image = product.Images[imageIndex]

    if (!image) return null

    const imageUrl = image?.formats?.large?.url || image?.url
    return imageUrl?.startsWith("http") ? imageUrl : `${strapiUrl}${imageUrl}`
  }

  const mobileRows = createMobileRows(products)
  const desktopRows = createDesktopRows(products)

  return (
    <div className="flex justify-center bg-white min-h-screen pt-20 py-6 lg:py-10">
      <div className="max-w-[1400px] w-full px-4 lg:px-6">
        {/* Mobile Layout - Always 2 columns */}
        <div className="lg:hidden">
          {mobileRows.map((row, rowIndex) => (
            <div key={`mobile-${rowIndex}`} className="grid grid-cols-2 gap-4 mb-6">
              {row.map((product) => {
                const mainImageUrl = getImageUrl(product, false)

                return (
                  <div key={product.id} className="w-full">
                    <Link href={`/products/${product.slug}`} className="block w-full">
                      <Card
                        className="flex flex-col p-0 shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full rounded-lg"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <CardContent className="h-full p-0 relative group">
                          {mainImageUrl ? (
                            <div className="relative w-full aspect-[2/3] overflow-hidden">
                              {/* Main Image */}
                              <Image
                                src={mainImageUrl || "/placeholder.svg"}
                                alt={product.productName}
                                fill
                                className="object-cover"
                                sizes="50vw"
                                priority={rowIndex < 2}
                              />
                              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                            </div>
                          ) : (
                            <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">No Image</span>
                            </div>
                          )}

                          <Button className="w-full min-h-[48px] bg-black hover:bg-gray-800 text-white text-sm font-medium py-3 transition-all duration-300 border-0 rounded-none">
                            View Details
                          </Button>
                        </CardContent>

                        <CardFooter className="flex flex-col items-start gap-3 p-4 w-full bg-gray-50">
                          <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight w-full">
                            {product.productName}
                          </CardTitle>
                          <CardDescription className="text-black font-bold text-lg w-full text-left">
                            Rs. {product.price?.toLocaleString()}
                          </CardDescription>
                        </CardFooter>
                      </Card>
                    </Link>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Desktop Layout - 3-2-3-2 pattern */}
        <div className="hidden lg:block">
          {desktopRows.map((row, rowIndex) => {
            const isOddRow = (rowIndex + 1) % 2 === 1

            return (
              <div
                key={`desktop-${rowIndex}`}
                className={`
                  mb-6 lg:mb-8
                  ${isOddRow ? "grid grid-cols-3 gap-6" : "grid grid-cols-2 gap-8 max-w-4xl xl:max-w-5xl mx-auto"}
                `}
              >
                {row.map((product) => {
                  const isHovered = hoveredProduct === product.id
                  const mainImageUrl = getImageUrl(product, false)
                  const hoverImageUrl = getImageUrl(product, true)

                  return (
                    <div key={product.id} className="w-full">
                      <Link href={`/products/${product.slug}`} className="block w-full">
                        <Card
                          className="flex flex-col p-0 shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full rounded-lg"
                          onMouseEnter={() => setHoveredProduct(product.id)}
                          onMouseLeave={() => setHoveredProduct(null)}
                        >
                          <CardContent className="h-full p-0 relative group">
                            {mainImageUrl ? (
                              <div className="relative w-full aspect-[2/3] overflow-hidden">
                                {/* Main Image */}
                                <Image
                                  src={mainImageUrl || "/placeholder.svg"}
                                  alt={product.productName}
                                  fill
                                  className={`object-cover transition-opacity duration-500 ${
                                    isHovered && hoverImageUrl && hoverImageUrl !== mainImageUrl
                                      ? "opacity-0"
                                      : "opacity-100"
                                  }`}
                                  sizes="(max-width: 1024px) 33vw, 25vw"
                                  priority={rowIndex < 2}
                                />

                                {/* Hover Image - Only show on desktop and if different from main image */}
                                {hoverImageUrl && hoverImageUrl !== mainImageUrl && (
                                  <Image
                                    src={hoverImageUrl || "/placeholder.svg"}
                                    alt={`${product.productName} - Close up`}
                                    fill
                                    className={`object-cover transition-opacity duration-500 ${
                                      isHovered ? "opacity-100" : "opacity-0"
                                    }`}
                                    sizes="(max-width: 1024px) 33vw, 25vw"
                                  />
                                )}

                                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                              </div>
                            ) : (
                              <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">No Image</span>
                              </div>
                            )}

                            <Button className="w-full min-h-[48px] bg-black hover:bg-gray-800 text-white text-sm font-medium py-3 transition-all duration-300 border-0 rounded-none">
                              View Details
                            </Button>
                          </CardContent>

                          <CardFooter className="flex flex-col items-start gap-3 p-4 w-full bg-gray-50">
                            <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 leading-tight w-full">
                              {product.productName}
                            </CardTitle>
                            <CardDescription className="text-black font-bold text-lg w-full text-left">
                              Rs. {product.price?.toLocaleString()}
                            </CardDescription>
                          </CardFooter>
                        </Card>
                      </Link>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
