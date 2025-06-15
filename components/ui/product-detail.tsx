"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react"

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
  price: number
  slug: string
  Description?: string
  category?: string
  Images?: ProductImage[]
  createdAt: string
  updatedAt: string
}

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0)

  const images = product.Images || []
  const maxVisibleThumbnails = 5

  const getImageUrl = (image: ProductImage, preferredFormat: "large" | "medium" | "small" = "medium") => {
    let imageUrl: string | undefined

    if (preferredFormat === "medium") {
      imageUrl = image?.formats?.medium?.url || image?.formats?.large?.url || image?.url
    } else if (preferredFormat === "large") {
      imageUrl = image?.formats?.large?.url || image?.formats?.medium?.url || image?.url
    } else {
      imageUrl = image?.formats?.small?.url || image?.formats?.medium?.url || image?.url
    }

    return imageUrl?.startsWith("http") ? imageUrl : `${strapiUrl}${imageUrl}`
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const nextThumbnails = () => {
    if (thumbnailStartIndex + maxVisibleThumbnails < images.length) {
      setThumbnailStartIndex((prev) => prev + 1)
    }
  }

  const prevThumbnails = () => {
    if (thumbnailStartIndex > 0) {
      setThumbnailStartIndex((prev) => prev - 1)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.productName,
          text: `Check out this amazing product: ${product.productName}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const visibleThumbnails = images.slice(thumbnailStartIndex, thumbnailStartIndex + maxVisibleThumbnails)

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-900">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.productName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {images.length > 0 ? (
              <>
                {/* Main Image - Smaller size for better quality */}
                <div className="relative w-full max-w-lg mx-auto aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={getImageUrl(images[currentImageIndex], "large") || "/placeholder.svg"}
                    alt={product.productName}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 90vw, 512px"
                    quality={90}
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="relative max-w-lg mx-auto">
                    {images.length > maxVisibleThumbnails && (
                      <>
                        <button
                          onClick={prevThumbnails}
                          disabled={thumbnailStartIndex === 0}
                          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow-lg transition-all ${
                            thumbnailStartIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>

                        <button
                          onClick={nextThumbnails}
                          disabled={thumbnailStartIndex + maxVisibleThumbnails >= images.length}
                          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow-lg transition-all ${
                            thumbnailStartIndex + maxVisibleThumbnails >= images.length
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    )}

                    <div
                      className={`grid gap-2 ${images.length > maxVisibleThumbnails ? "px-8" : ""}`}
                      style={{ gridTemplateColumns: `repeat(${Math.min(images.length, maxVisibleThumbnails)}, 1fr)` }}
                    >
                      {visibleThumbnails.map((image, index) => {
                        const actualIndex = thumbnailStartIndex + index
                        return (
                          <button
                            key={actualIndex}
                            onClick={() => setCurrentImageIndex(actualIndex)}
                            className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
                              actualIndex === currentImageIndex
                                ? "ring-2 ring-black"
                                : "ring-1 ring-gray-200 hover:ring-gray-400"
                            }`}
                          >
                            <Image
                              src={getImageUrl(image, "small") || "/placeholder.svg"}
                              alt={`${product.productName} ${actualIndex + 1}`}
                              fill
                              className="object-cover"
                              sizes="80px"
                              quality={75}
                            />
                          </button>
                        )
                      })}
                    </div>

                    {images.length > maxVisibleThumbnails && (
                      <div className="flex justify-center mt-2 space-x-1">
                        {Array.from({ length: Math.ceil(images.length / maxVisibleThumbnails) }).map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              Math.floor(thumbnailStartIndex / maxVisibleThumbnails) === index
                                ? "bg-black"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full max-w-lg mx-auto aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No images available</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.productName}</h1>
              {product.category && <p className="text-lg text-gray-600 capitalize">{product.category}</p>}
            </div>

            <div className="text-3xl font-bold text-gray-900">Rs. {product.price?.toLocaleString()}</div>

            {product.Description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.Description}</p>
              </div>
            )}

            <div className="space-y-4">
              <Button className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-medium">
                Contact for Purchase
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 ${isWishlisted ? "bg-red-50 border-red-200 text-red-600" : ""}`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>

                <Button variant="outline" onClick={handleShare} className="flex-1">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product ID:</span>
                    <span className="font-medium">{product.id}</span>
                  </div>
                  {product.category && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{product.category}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className="font-medium text-green-600">Contact for Availability</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}