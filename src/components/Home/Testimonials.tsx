"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { FC } from "react"

// Testimonial data
const testimonials = [
  {
    id: 1,
    quote:
      "THE FLOW BETWEEN BOTH SIDES WAS IMPRESSIVELY SMOOTH, WHILE THE TEAM DEMONSTRATED EXCEPTIONAL EXPERTISE AND KNOW-HOW.",
    author: "Richard Pearson",
    position: "CEO at TechCorp",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    quote:
      "THEIR STRATEGIC APPROACH TO PROBLEM-SOLVING AND ATTENTION TO DETAIL RESULTED IN A SOLUTION THAT EXCEEDED OUR EXPECTATIONS.",
    author: "Sarah Johnson",
    position: "CTO at InnovateTech",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    quote:
      "WORKING WITH THIS TEAM HAS TRANSFORMED OUR BUSINESS OPERATIONS. THEIR INSIGHTS AND TECHNICAL PROWESS ARE UNMATCHED IN THE INDUSTRY.",
    author: "Michael Chen",
    position: "Founder of NextGen Solutions",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

const Testimonials: FC = () => {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setAutoplay(false)
    setCurrent(index)
  }

  return (
    <section className="w-full py-16 flex justify-center bg-blue-600">
      <div className="max-w-4xl w-full bg-blue-700 rounded-xl shadow-lg p-10 relative overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide uppercase text-white">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-blue-300 mx-auto mt-4 rounded"></div>
        </motion.div>

        {/* Testimonial container: flex row with avatar on left and quote on right */}
        <div className="flex items-center space-x-8">
          {/* Left side: avatar with big quotes */}
          <div className="flex flex-col items-center justify-center space-y-4 flex-shrink-0">
            <div className="text-blue-300 text-[120px] font-serif opacity-30 select-none leading-none -mb-10">“</div>
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-blue-400">
              <img
                src={testimonials[current].avatar || "/placeholder.svg"}
                alt={testimonials[current].author}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-blue-300 text-[120px] font-serif opacity-30 select-none leading-none -mt-10 rotate-180">“</div>
          </div>

          {/* Right side: testimonial text */}
          <div className="flex-1 text-white relative z-10 min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-left"
              >
                <p className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                  {testimonials[current].quote}
                </p>
                <div>
                  <p className="font-bold text-white text-lg">{testimonials[current].author}</p>
                  <p className="text-sm text-blue-300">{testimonials[current].position}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-500/90 hover:bg-blue-600 text-white shadow-lg rounded-full p-2 z-30"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500/90 hover:bg-blue-600 text-white shadow-lg rounded-full p-2 z-30"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots navigation */}
        <div className="flex justify-center mt-10 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                current === index ? "bg-blue-300" : "bg-blue-900/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
