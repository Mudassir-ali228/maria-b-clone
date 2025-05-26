"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wider cursor-pointer">MARIA.B</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300"
              >
                HOME
              </Link>
              <Link
                href="/products"
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300"
              >
                PRODUCTS
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md rounded-b-lg">
              <Link
                href="/"
                className="text-white hover:text-gray-300 block px-3 py-2 text-base font-medium tracking-wide transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                href="/products"
                className="text-white hover:text-gray-300 block px-3 py-2 text-base font-medium tracking-wide transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                PRODUCTS
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
