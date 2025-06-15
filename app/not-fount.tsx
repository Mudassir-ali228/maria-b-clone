import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you`re looking for doesn`t exist.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

export const metadata = {
  title: "Page Not Found - Maria.B",
  description: "The page you're looking for doesn't exist.",
}
