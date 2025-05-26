"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="bg-black">
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] mt-16">
        <Image
          src="/brides_page_banner_1944x.webp"
          alt="Brides Page Banner"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Brand Description */}
      <div className="flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
        <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-center max-w-4xl leading-relaxed font-light">
          Transforming rhythmic designs into timeless creations with artistic compositions glistened with delicate
          details & enticing embellishments – Maria.B Couture & Bridal silhouettes impeccably weave a tale of
          timelessness & grandiosity.
        </p>
        <h1 className="mt-6 sm:mt-8 text-3xl sm:text-4xl lg:text-5xl text-center font-bold tracking-wider">MARIA.B</h1>
      </div>

      {/* Formals Section */}
      <div className="min-h-screen text-white flex justify-center items-center py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide">FORMALS</h2>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed font-light">
              Step into a realm where dreams are stitched into reality with Maria.B Formal Collection – Exhibiting a
              harmonious fusion of cultural heritage, regal elegance & contemporary aesthetics that whisper tales of
              timeless beauty.
            </p>
            <Button
              className="text-base sm:text-lg font-medium bg-white text-black hover:bg-gray-200 transition-colors duration-300 px-8 py-3"
              onClick={() => (window.location.href = `/collection/${"fx"}`)}
            >
              View Collection
            </Button>
          </div>
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] order-1 lg:order-2">
            <Image
              src="/FORMAL_Tile_9a2dcef9-7210-4e13-8131-1a11c2c8ad9a_900x.webp"
              alt="Formal dress collection"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="min-h-screen text-white flex justify-center items-center py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
            <Image
              src="/Signature_Tile_57efacf3-9a8d-45a4-a824-30ce5ee7589b_900x.webp"
              alt="Signature dress collection"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>
          <div className="space-y-6 lg:space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide">SIGNATURE</h2>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed font-light">
              Radiating a blend of sophistication and heritage - Maria.B Signature Collection narrates a saga of
              timeless elegance with ethereal silhouettes, opulent craftsmanship, luxurious jewels & embellishments that
              offer a timeless bridal experience.
            </p>
            <Button
              className="text-base sm:text-lg font-medium bg-white text-black hover:bg-gray-200 transition-colors duration-300 px-8 py-3"
              onClick={() => (window.location.href = `/collection/${"sg"}`)}
            >
              View Collection
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-600 mx-4 sm:mx-6 lg:mx-8" />

      {/* Inspired Weddings Section */}
      <div className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 tracking-wide">
          MARIA.B INSPIRED WEDDINGS
        </h2>

        {/* Mobile Layout */}
        <div className="lg:hidden max-w-2xl mx-auto space-y-8">
          <div className="relative w-full h-[660px]">
            <Image
              src="/Tile_1_8e02e7fa-f084-43e5-9693-bc74c1c96d77_720x.webp"
              alt="Bridal Gown"
              fill
              className="object-cover rounded-lg"
              sizes="100vw"
            />
          </div>

          <div className="relative w-full h-[450px]">
            <Image
              src="/Tile_2_f4cd8ec4-16a9-4d31-9b79-a183394d65c5_540x.webp"
              alt="Bride Entrance"
              fill
              className="object-cover rounded-lg"
              sizes="100vw"
            />
          </div>

          <div className="space-y-6">
            <p className="text-base sm:text-lg leading-relaxed font-light">
              From flowy gown sets to lehenga sets for the mehndi, baraat & walima, to setting a color scheme & motifs
              that echo our brand`s aesthetic, the possibilities of a Maria-inspired wedding are countless.
            </p>
            <button className="w-full sm:w-auto px-6 py-3 rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-300 text-base font-medium">
              ENQUIRE NOW
            </button>
          </div>

          <div className="relative w-full h-[250px]">
            <Image
              src="/Tile_3_152ea7f8-5472-4889-b86f-c47cdf2b906c_1080x.webp"
              alt="Smiling Bride"
              fill
              className="object-cover rounded-lg"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="lg:row-span-2 relative">
            <Image
              src="/Tile_1_8e02e7fa-f084-43e5-9693-bc74c1c96d77_720x.webp"
              alt="Bridal Gown"
              width={400}
              height={600}
              className="w-full h-full object-cover rounded-lg"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>

          <div className="relative">
            <Image
              src="/Tile_2_f4cd8ec4-16a9-4d31-9b79-a183394d65c5_540x.webp"
              alt="Bride Entrance"
              width={400}
              height={240}
              className="w-full h-auto object-cover rounded-lg"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>

          <div className="flex flex-col justify-start pt-6 space-y-6">
            <p className="text-lg leading-relaxed font-light">
              From flowy gown sets to lehenga sets for the mehndi, baraat & walima, to setting a color scheme & motifs
              that echo our brand`s aesthetic, the possibilities of a Maria-inspired wedding are countless.
            </p>
            <button className="w-fit px-6 py-3 rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-300 text-base font-medium">
              ENQUIRE NOW
            </button>
          </div>

          <div className="lg:col-span-2 relative">
            <Image
              src="/Tile_3_152ea7f8-5472-4889-b86f-c47cdf2b906c_1080x.webp"
              alt="Smiling Bride"
              width={800}
              height={300}
              className="w-full h-auto object-cover rounded-lg"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-black text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-wide">BOOK A STORE APPOINTMENT</h3>
        <div className="space-y-2 max-w-2xl mx-auto">
          <p className="text-sm sm:text-base font-light">
            TO SCHEDULE A VIRTUAL OR IN-STORE APPOINTMENT WITH OUR FASHION CONSULTANT KINDLY CONTACT AT
          </p>
          <p className="text-sm sm:text-base font-medium">WHATSAPP: +92 332 4122262</p>
          <p className="text-sm sm:text-base">
            OR EMAIL AT{" "}
            <a href="mailto:ORDERS@MARIAB.PK" className="underline hover:text-gray-300 transition-colors duration-300">
              ORDERS@MARIAB.PK
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
