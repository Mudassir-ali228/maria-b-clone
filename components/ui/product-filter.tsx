"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Filter } from "lucide-react"

interface Category {
  id: string
  name: string
  label: string
}

interface ProductFilterProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

const sortOptions = [
  { value: "date-desc", label: "Date, new to old" },
  { value: "date-asc", label: "Date, old to new" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "name-asc", label: "Name, A to Z" },
  { value: "name-desc", label: "Name, Z to A" },
]

export default function ProductFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ProductFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const selectedCategoryLabel = categories.find((cat) => cat.id === selectedCategory)?.label || "All Categories"
  const selectedSortLabel = sortOptions.find((option) => option.value === sortBy)?.label || "Date, new to old"

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">

          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 text-sm font-medium">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <div className="px-2 py-1.5 text-sm font-semibold text-gray-900">Categories</div>
              <DropdownMenuItem
                onClick={() => onCategoryChange("all")}
                className={`cursor-pointer ${selectedCategory === "all" ? "bg-gray-100" : ""}`}
              >
                All Categories
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`cursor-pointer ${selectedCategory === category.id ? "bg-gray-100" : ""}`}
                >
                  {category.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 text-sm font-medium">
                {selectedSortLabel}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`cursor-pointer ${sortBy === option.value ? "bg-gray-100" : ""}`}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {selectedCategory !== "all" && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-gray-600">Active filters:</span>
            <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm">
              {selectedCategoryLabel}
              <button onClick={() => onCategoryChange("all")} className="ml-1 text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}