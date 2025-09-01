import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote:
      "Our aim is to empower patients and healthcare providers with the tools they need to achieve better health.",
    company: "Lightbox",
    logo: "/placeholder.svg?height=40&width=100",
  },
  {
    id: 2,
    quote: "Driven by our unwavering commitment to quality, safety, and efficacy.",
    company: "Segment",
    logo: "/placeholder.svg?height=40&width=100",
  },
  {
    id: 3,
    quote: "We believe in the power of collaboration and are proud to partner with leading innovators.",
    company: "FeatherDev",
    logo: "/placeholder.svg?height=40&width=100",
  },
  {
    id: 4,
    quote: "Innovation and partnership drive our success in healthcare solutions.",
    company: "MediCore",
    logo: "/placeholder.svg?height=40&width=100",
  },
  {
    id: 5,
    quote: "Our dedication to excellence is reflected in our patient-first approach.",
    company: "HealthPlus",
    logo: "/placeholder.svg?height=40&width=100",
  },
]

export default function PartnersThoughts() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    // This will be handled by CSS, but we need this for calculation
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 4
    }
    return 1 // Default for SSR
  }

  // Items visible per view
  const itemsPerView = getItemsPerView()

  // maxIndex ensures we don't overflow on sliding
  const maxIndex = Math.max(0, testimonials.length - itemsPerView)

  function handleNext() {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  function handlePrev() {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-2 sm:mb-0">
            Voice of Partners <span className="text-blue-600">& Investors</span>
          </h2>
          <Link
            to="/partners"
            className="flex items-center text-sm text-gray-600 hover:text-blue-500 transition-colors"
          >
            View all partners <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <p className="text-gray-600 mb-8 sm:mb-12 max-w-2xl text-sm sm:text-base">
          View our case studies and become a partner
        </p>

        {/* Carousel viewport */}
        <div className="overflow-hidden">
          {/* Carousel track */}
          <div className="relative">
            <motion.div
              className="flex space-x-4 sm:space-x-6"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-4 sm:p-6 border-t-2 border-blue-500 bg-white flex flex-col justify-between min-h-[200px]"
                  style={{ minWidth: "85vw", maxWidth: "85vw", marginRight: "1rem" }}
                >
                  <div className="mb-3 sm:mb-4 text-blue-500 font-bold text-3xl sm:text-4xl leading-none">"</div>
                  <p className="text-gray-800 mb-4 sm:mb-6 flex-grow text-sm sm:text-base">{testimonial.quote}</p>
                  <div className="mt-auto flex items-center space-x-4">
                    <img
                      src={testimonial.logo || "/placeholder.svg"}
                      alt={testimonial.company}
                      className="h-8 sm:h-10 object-contain"
                    />
                    <span className="text-gray-700 font-semibold text-sm sm:text-base">{testimonial.company}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              } transition-colors`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
